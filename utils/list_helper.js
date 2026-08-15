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
    if(b.likes > maxLikes) {
      maxLikes = b.likes;
      mostLiked = b;
    }
  });
  return mostLiked;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}