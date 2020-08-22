import React from 'react';
import Avatar from './Avatar/Avatar.js';
import Description from './Description/Description.js';
import WriteNewPost from './WriteNewPost/WriteNewPost.js';
import MyPosts from './MyPosts/MyPosts.js';
import styles from './Profile.module.css';

function Profile(props){
	return (
		<div className={styles.profile}>
			<Avatar />
			<Description />
			<WriteNewPost />
			<MyPosts PostsData={props.PostsData}/>
		</div>
	);
}

export default Profile;