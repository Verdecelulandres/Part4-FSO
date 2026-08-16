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

test('correctly creates blog', async () => {
  const newBlog = {
    title: 'cincuentaycuatro',
    author: 'AndrewdaGreen',
    url: 'jeje',
    likes: 69,
  };
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAfter = await helper.blogsInDB();
  const targetBlog = blogsAfter.find(b => b.id === response.body.id);

  assert.strictEqual(blogsAfter.length, helper.blogs.length + 1);
  assert.deepStrictEqual(targetBlog, response.body);
});

after(async () => {
  await mongoose.connection.close();
});