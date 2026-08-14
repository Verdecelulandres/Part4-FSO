const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

const app = express();


mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(() => console.log('connected to Mongo'))
  .catch();

app.use(express.json());

app.use('/api/blogs', blogsRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})