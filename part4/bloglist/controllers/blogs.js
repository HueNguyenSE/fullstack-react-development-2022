const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
	Blog.find({}).then((returnedBlogs) => {
		console.log(returnedBlogs);
		res.json(returnedBlogs);
	});
});

blogsRouter.get('/:id', (req, res, next) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			if (blog) {
				res.json(blog);
			} else {
				res.statusMessage = 'The blog does not exist';
				res.status(404).end();
			}
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
});

blogsRouter.post('/', (req, res) => {
	const reqBody = req.body;

	if (!reqBody.title || !reqBody.url) {
		return res.status(400).json({
			error: 'required info missing',
		});
	}
	const newBlog = new Blog({
		title: reqBody.title,
		author: reqBody.author,
		url: reqBody.url,
		likes: 0,
	});

	newBlog.save().then((savedBlog) => {
		res.json(savedBlog);
	});
});

blogsRouter.put('/:id', (req, res, next) => {
	const reqBody = req.body;

	const blog = {
		title: reqBody.title,
		author: reqBody.author,
		url: reqBody.url,
		likes: reqBody.likes,
	};

	Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
		.then((updatedBlog) => {
			res.json(updatedBlog);
		})
		.catch((error) => next(error));
});

module.exports = blogsRouter;
