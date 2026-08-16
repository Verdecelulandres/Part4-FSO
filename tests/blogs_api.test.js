const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./tests_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct amount of blogs is returned', async () => {
  const result = await api.get('/api/blogs');
  assert.strictEqual(result.body.length, helper.blogs.length);
});

test('unique id is called id', async () => {
  const result = await api.get('/api/blogs');
  const objectKeys = [];
  result.body.forEach(b => {
    const keys = Object.keys(b);
    objectKeys.push(...keys);
  });

  assert(!objectKeys.includes('_id'));
  assert(objectKeys.includes('id'));
});

after(async () => {
  await mongoose.connection.close();
});