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

module.exports = {
  dummy,
  totalLikes
}