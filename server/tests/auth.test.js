const { test, before, after, describe, afterEach } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

// Silence logs
console.log = () => {};
console.error = () => {};

describe("Auth API", () => {
  before(async () => {
    // Wait for connection if needed, though server.js handles it
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
  });

  after(async () => {
    // Close server and db
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({ email: "test@example.com" });
  });

  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    assert.strictEqual(res.statusCode, 201);
    assert.ok(res.body.token);
  });

  test("should login an existing user", async () => {
    // Register first
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    // Login
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.token);
  });

  test("should not register a duplicate user", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      username: "testuser2",
      email: "test@example.com",
      password: "password123",
    });
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.message, "User already exists");
  });
});
