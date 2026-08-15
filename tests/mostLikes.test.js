const { test, describe } = require('node:test');
const assert = require('node:assert');
const { mostLikes, blogs } = require('../utils/list_helper');

describe('Most likes', () => {

  test('of an empty list is null', () => {
    const result = mostLikes([]);
    assert.strictEqual(result, null);
  });

  test('of a bigger list is found correctly', () => {
    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
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
      author: 'Another guy',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ];
  test('of equal blogs return the 1st', () => {
    const result = mostLikes(equalLikeBlogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      likes: 2
    });
  });
});