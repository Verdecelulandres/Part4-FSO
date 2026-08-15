const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
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

const dummy = (blogs) => {
  return blogs.length > 0 ? 1 : 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.reduce((sum, current) =>
    sum + (current.likes ? current.likes : 0), 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let mostLiked = {};
  let maxLikes = 0;
  blogs.forEach(b => {
    if (b.likes > maxLikes) {
      maxLikes = b.likes;
      mostLiked = b;
    }
  });
  return mostLiked;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authors = new Map();
  let maxBlogs = 0;
  let maxAuthor = '';
  blogs.forEach(b => {
    if (authors.has(b.author)) {
      authors.set(b.author, (authors.get(b.author) + 1));
    } else {
      authors.set(b.author, 1);
    }
    if (authors.get(b.author) > maxBlogs) {
      maxBlogs = authors.get(b.author);
      maxAuthor = b.author;
    }
  });
  return { author: maxAuthor, blogs: maxBlogs };
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authors = new Map();
  let maxLikes = 0;
  let maxAuthor = '';
  blogs.forEach(b => {
    if (authors.has(b.author)) {
      authors.set(b.author, (authors.get(b.author) + b.likes));
    } else {
      authors.set(b.author, b.likes);
    }
    if (authors.get(b.author) > maxLikes) {
      maxLikes = authors.get(b.author);
      maxAuthor = b.author;
    }
  });
  return { author: maxAuthor, likes: maxLikes };
}

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}