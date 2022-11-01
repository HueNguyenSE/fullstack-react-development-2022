import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const like = <FontAwesomeIcon icon={faThumbsUp} />;

const Blog = ({ blog, addNewLike }) => {
	return (
		<div class="blog">
			<h2>{blog.title}</h2>
			<p>Author: {blog.author}</p>
			<a href={blog.url} target='blank'>
				<p>Link to the blog</p>
			</a>
			<div>
				<button onClick={addNewLike} alt='like'>{like}Like</button>
				<span>{blog.likes}</span>
			</div>
		</div>
	);
};

export default Blog;
