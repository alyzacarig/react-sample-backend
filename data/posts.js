const fs = require('fs/promises');
const filePath = './posts.json'; // Ensure path is correct

async function getStoredPosts() {
	try {
		const rawFileContent = await fs.readFile(filePath, 'utf-8');
		const data = JSON.parse(rawFileContent);
		return data.posts ?? [];
	} catch (error) {
		return []; // Return empty array if file doesn't exist
	}
}

async function storePosts(posts) {
	return fs.writeFile(filePath, JSON.stringify({ posts: posts || [] }));
}

module.exports = { getStoredPosts, storePosts };
