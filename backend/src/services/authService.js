const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(name, email, password) {
  const [existingUsers] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUsers.length > 0) {
    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const [result] = await pool.query(
    `
      INSERT INTO users
      (name, email, password_hash, role)
      VALUES (?, ?, ?, 'CUSTOMER')
    `,
    [name, email, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    email,
    role: "CUSTOMER",
  };
}

async function loginUser(email, password) {
  const [users] = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        password_hash,
        role
      FROM users
      WHERE email = ?
    `,
    [email]
  );

  if (users.length === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = users[0];

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async function getUserById(userId) {
  const [users] = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = ?
    `,
    [userId]
  );

  if (users.length === 0) {
    return null;
  }

  return users[0];
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};