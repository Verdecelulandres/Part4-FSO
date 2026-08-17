const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body;
  const user = await User.findOne({});
  newBlog.user = user._id;
  const blog = new Blog(newBlog);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).end();
  }
  blog.likes = likes;

  const updatedBlog = await blog.save();
  response.json(updatedBlog);

});

module.exports = blogsRouter;