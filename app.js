const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // Parse JSON requests

// ✅ Simplified CORS setup (Remove manual headers)
app.use(cors({
  origin: "https://react-poster-kappa.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
}));

// ✅ Handle preflight requests properly
app.options("*", cors());

// Temporary in-memory storage
let posts = [];

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Fetch all posts
app.get('/posts', (req, res) => {
  res.json({ posts });
});

// Add a new post
app.post('/posts', (req, res) => {
  const newPost = { id: Date.now().toString(), ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Edit a post
app.put('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex((post) => post.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts[postIndex].body = req.body.body;
  res.json(posts[postIndex]);
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);
  res.json({ message: 'Post deleted' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
