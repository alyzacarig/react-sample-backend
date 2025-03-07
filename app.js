const express = require('express');
const cors = require('cors');
const { getStoredPosts, storePosts } = require('./data/posts'); // Import from data/posts.js

const app = express();
app.use(cors());
app.use(express.json());

// Fetch all posts
app.get('/posts', async (req, res) => {
	const posts = await getStoredPosts();
	res.json({ posts });
});

// Add a new post
app.post('/posts', async (req, res) => {
	const posts = await getStoredPosts();
	const newPost = { id: Date.now().toString(), ...req.body };
	posts.push(newPost);
	await storePosts(posts);
	res.status(201).json(newPost);
});

// Edit a post
app.put('/posts/:id', async (req, res) => {
	const posts = await getStoredPosts();
	const postIndex = posts.findIndex((post) => post.id === req.params.id);

	if (postIndex === -1) {
		return res.status(404).json({ error: 'Post not found' });
	}

	posts[postIndex].body = req.body.body; // Update post body
	await storePosts(posts);
	res.json(posts[postIndex]);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
	let posts = await getStoredPosts();
	posts = posts.filter((post) => post.id !== req.params.id);
	await storePosts(posts);
	res.json({ message: 'Post deleted' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
