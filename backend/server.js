
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'REPLACE_WITH_A_RANDOM_SECRET') {
    throw new Error('A secure JWT_SECRET must be configured in .env');
}

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

const emailConfigured = Boolean(
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.EMAIL_FROM
);

const transporter = emailConfigured
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    : null;

function createAccessToken(user) {
    return jwt.sign(
        {
            id: user.user_id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

function authenticateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.startsWith('Bearer ')
        ? authorization.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired session.' });
        }

        req.user = decoded;
        next();
    });
}

app.get('/', (req, res) => {
    res.send('Library Management System API is running!');
});

// Student registration only. Public registration cannot create administrators.
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, name, email, password } = req.body;
        const userName = (fullName || name || '').trim();
        const normalizedEmail = (email || '').trim().toLowerCase();

        if (!userName || !normalizedEmail || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        db.run(
            `INSERT INTO users (name, email, password_hash, role)
             VALUES (?, ?, ?, 'student')`,
            [userName, normalizedEmail, passwordHash],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(409).json({ error: 'An account with this email already exists.' });
                    }
                    console.error('Registration error:', err.message);
                    return res.status(500).json({ error: 'Could not create account.' });
                }

                const user = {
                    id: this.lastID,
                    name: userName,
                    email: normalizedEmail,
                    role: 'student'
                };

                const token = createAccessToken({
                    user_id: user.id,
                    email: user.email,
                    role: user.role
                });

                res.status(201).json({ message: 'Account created successfully.', token, user });
            }
        );
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Could not create account.' });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password, role } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    db.get(
        `SELECT user_id, name, email, password_hash, role
         FROM users WHERE email = ?`,
        [normalizedEmail],
        async (err, user) => {
            if (err) {
                console.error('Login database error:', err.message);
                return res.status(500).json({ error: 'Login failed.' });
            }

            if (!user || !(await bcrypt.compare(password, user.password_hash))) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            if (role && role !== user.role) {
                return res.status(403).json({ error: 'This account does not have the selected role.' });
            }

            const token = createAccessToken(user);

            res.json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
});

// Current authenticated user
app.get('/api/auth/me', authenticateToken, (req, res) => {
    db.get(
        `SELECT user_id, name, email, role FROM users WHERE user_id = ?`,
        [req.user.id],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Could not load account.' });
            }
            if (!user) {
                return res.status(404).json({ error: 'Account not found.' });
            }

            res.json({
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
    );
});

// Request password reset
app.post('/api/auth/forgot-password', (req, res) => {
    const email = (req.body.email || '').trim().toLowerCase();

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    // Always return the same response to avoid revealing registered emails.
    const genericResponse = {
        message: 'If an account exists for that email, a password reset link will be sent.'
    };

    db.get(
        'SELECT user_id, email FROM users WHERE email = ?',
        [email],
        (err, user) => {
            if (err) {
                console.error('Password reset lookup error:', err.message);
                return res.json(genericResponse);
            }

            if (!user) {
                return res.json(genericResponse);
            }

            const rawToken = crypto.randomBytes(32).toString('hex');
            const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
            const now = Date.now();
            const expiresAt = now + 15 * 60 * 1000;

            db.run(
                `UPDATE password_reset_tokens
                 SET used_at = ?
                 WHERE user_id = ? AND used_at IS NULL`,
                [now, user.user_id],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Could not invalidate previous tokens:', updateErr.message);
                        return res.json(genericResponse);
                    }

                    db.run(
                        `INSERT INTO password_reset_tokens
                         (user_id, token_hash, expires_at, created_at)
                         VALUES (?, ?, ?, ?)`,
                        [user.user_id, tokenHash, expiresAt, now],
                        async (insertErr) => {
                            if (insertErr) {
                                console.error('Could not create reset token:', insertErr.message);
                                return res.json(genericResponse);
                            }

                            const resetUrl =
                                `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${rawToken}`;

                            if (!transporter) {
                                if (process.env.NODE_ENV !== 'production') {
                                    console.log('Development password reset link:', resetUrl);
                                } else {
                                    console.error('SMTP is not configured.');
                                }
                                return res.json(genericResponse);
                            }

                            try {
                                await transporter.sendMail({
                                    from: process.env.EMAIL_FROM,
                                    to: user.email,
                                    subject: 'BookNest Password Reset',
                                    text: `You requested a password reset. Open this link within 15 minutes:\n\n${resetUrl}\n\nIf you did not request this, ignore this email.`,
                                    html: `<p>You requested a password reset.</p><p><a href="${resetUrl}">Reset your BookNest password</a></p><p>This link expires in 15 minutes. If you did not request this, ignore this email.</p>`
                                });
                            } catch (mailErr) {
                                console.error('Password reset email failed:', mailErr.message);
                            }

                            return res.json(genericResponse);
                        }
                    );
                }
            );
        }
    );
});

// Set a new password
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required.' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const now = Date.now();

        db.get(
            `SELECT token_id, user_id
             FROM password_reset_tokens
             WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?`,
            [tokenHash, now],
            async (err, resetRecord) => {
                if (err) {
                    return res.status(500).json({ error: 'Password reset failed.' });
                }

                if (!resetRecord) {
                    return res.status(400).json({ error: 'This reset link is invalid or expired.' });
                }

                const passwordHash = await bcrypt.hash(newPassword, 12);

                db.serialize(() => {
                    db.run(
                        'UPDATE users SET password_hash = ? WHERE user_id = ?',
                        [passwordHash, resetRecord.user_id],
                        function (updateErr) {
                            if (updateErr || this.changes === 0) {
                                console.error('Password update failed:', updateErr?.message);
                                return res.status(500).json({ error: 'Could not update password.' });
                            }

                            db.run(
                                `UPDATE password_reset_tokens
                                 SET used_at = ?
                                 WHERE user_id = ? AND used_at IS NULL`,
                                [now, resetRecord.user_id],
                                (tokenErr) => {
                                    if (tokenErr) {
                                        console.error('Token invalidation failed:', tokenErr.message);
                                    }
                                    return res.json({ message: 'Password updated successfully. You can now log in.' });
                                }
                            );
                        }
                    );
                });
            }
        );
    } catch (err) {
        console.error('Password reset error:', err);
        res.status(500).json({ error: 'Password reset failed.' });
    }
});

// Books
app.get('/api/books', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Could not load books.' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(emailConfigured
        ? 'Password reset email is configured.'
        : 'SMTP is not configured. Development reset links will appear in this terminal.');
});
