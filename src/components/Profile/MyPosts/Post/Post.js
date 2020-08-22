import React from 'react';
import styles from './Post.css';

const Post = (props) => {
	console.log(props);
	return (
		<div className={styles.post}>
			<p>{props.text}</p>
			<span>{props.likesCount}</span>
		</div>
	);
}

export default Post;