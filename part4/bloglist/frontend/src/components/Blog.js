import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const like = <FontAwesomeIcon icon={faThumbsUp} />;

const Blog = ({ blog, addNewLike }) => {
	return (
		<div id={blog.id}>
			<h1>{blog.title}</h1>
			<p>Author: <span>{blog.author}</span></p>
			<a href={blog.url} target='blank'>
				<p>Link to the blog</p>
			</a>
			<div>
				<button onClick={addNewLike}>{like}Like</button>
				<span>{blog.likes}</span>
			</div>
		</div>
	);
};

export default Blog;
