import React from 'react';
import Blog from './components/Blog';
import { useState, useEffect } from 'react';
import blogService from './services/blogs';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [newUrl, setNewUrl] = useState('');

	//fetch data fronm the server
	const hook = () => {
		console.log('effect');
		blogService.getAll().then(initialBlogs => {
			console.log('fulfilled');
			setBlogs(initialBlogs);
		}).catch(err => {
			alert('failed to fetch data')
		});
	};
	useEffect(hook, []);
	console.log('render', blogs.length, 'blogs');

	//get the input of the title
	const handleTitleChange = (event) => {
		console.log(event.target.value);
		setNewTitle(event.target.value);
	};

	//get the input of the author
	const handleAuthorChange = (event) => {
		console.log(event.target.value);
		setNewAuthor(event.target.value);
	};

	//get the input of the url
	const handleUrlChange = (event) => {
		console.log(event.target.value);
		setNewUrl(event.target.value);
	};

	const addNewBlog = (event) => {
		event.preventDefault();
		//console.log('button click', event.target);
		//check whether the url is already existing
		const isExist = blogs.some(
			(blog) => blog.url.toLowerCase() === newUrl.toLowerCase()
		);

		if (isExist) {
			window.alert(`${newUrl} already exists`);
			setNewUrl('');
		} else {
			const blogObject = {
				title: newTitle,
				author: newAuthor,
				url: newUrl,
				likes: 0,
			};
			console.log(blogObject.likes);

			blogService.create(blogObject).then(returnedBlog => {
				//console.log(returnedBlogs);
				setBlogs(blogs.concat(returnedBlog));
				setNewTitle('');
				setNewAuthor('');
				setNewUrl('');
			});
		}
	};

	const addNewLike = (id) => {
		const blog = blogs.find((blog) => blog.id === id);
		blog.likes += 1;
		// console.log(blog.likes)
		// const changedBlog = { ...blog};
		// console.log('changed blog', changedBlog)

		blogService.update(id, blog).then(returnedBlog => {
			setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)));
			// console.log(response.data);
			// console.log(blog.likes);
			// console.log('added like');
		});
	};

	return (
		<div className='App'>
			<h1>Save a blog</h1>
			<form onSubmit={addNewBlog} id='blog'>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						name='title'
						value={newTitle}
						required
						onChange={handleTitleChange}
					></input>
				</div>
				<div>
					<label htmlFor='author'>Author</label>
					<input
						type='text'
						id='author'
						name='author'
						value={newAuthor}
						onChange={handleAuthorChange}
					></input>
				</div>
				<div>
					<label htmlFor='url'>URL</label>
					<input
						type='text'
						id='url'
						name='url'
						value={newUrl}
						required
						onChange={handleUrlChange}
					></input>
				</div>

				<button type='submit'>Save</button>
			</form>
			<div>
				<h1>Blogs</h1>
				{blogs.map((blog) => (
					<Blog blog={blog} addNewLike={() => addNewLike(blog.id)} />
				))}
			</div>
		</div>
	);
};

export default App;
