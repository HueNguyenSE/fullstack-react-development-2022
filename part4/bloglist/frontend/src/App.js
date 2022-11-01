import React from 'react';
import Blog from './components/Blog';
import { useState } from 'react';

const App = (props) => {
	const [blogs, setBlogs] = useState(props.blogs);
	const [newTitle, setNewTitle] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [newUrl, setNewUrl] = useState('');
	const [likes, setLikes] = useState(0);

	const addNewBlog = (event) => {
		event.preventDefault();
		console.log('button click', event.target);
		const blogObject = {
			id: Math.random().toString(),
			title: newTitle,
			author: newAuthor,
			url: newUrl,
      likes: 0,
		};
    console.log(blogObject.likes)

		setBlogs(blogs.concat(blogObject));
		setNewTitle('');
		setNewAuthor('');
		setNewUrl('');
	};

	const handleTitleChange = (event) => {
		console.log(event.target.value);
		setNewTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		console.log(event.target.value);
		setNewAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		console.log(event.target.value);
		setNewUrl(event.target.value);
	};

	const addNewLike = (id) => {
		const blog = blogs.find(blog => blog.id === id);
    const numLikes = blog.likes++;
    setLikes(numLikes)
    console.log(blog.likes)
    console.log('added like')
	};

	return (
		<div>
			<h1>Blog List</h1>
			<form onSubmit={addNewBlog} id='blog'>
				<div>
					<label for='title'>Title</label>
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
					<label for='author'>Author</label>
					<input
						type='text'
						id='author'
						name='author'
						value={newAuthor}
						onChange={handleAuthorChange}
					></input>
				</div>
				<div>
					<label for='url'>URL</label>
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

			{blogs.map((blog) => (
				<Blog blog={blog} addNewLike={() => addNewLike(blog.id)} />
			))}
		</div>
	);
};

export default App;
