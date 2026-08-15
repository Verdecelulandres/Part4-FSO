const { test, describe } = require('node:test');
const assert = require('node:assert');
const { favoriteBlog, blogs } = require('../utils/list_helper');

describe('Favorite blog', () => {

  test('of an empty list is null', () => {
    const result = favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test('of a bigger list is found correctly', () => {
    const result = favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    });
  });

  const equalLikeBlogs = [
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ];
  test('of equal likes return the 1st', () => {
    const result = favoriteBlog(equalLikeBlogs);
    assert.deepStrictEqual(result, {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 2,
      __v: 0
    });
  });
});