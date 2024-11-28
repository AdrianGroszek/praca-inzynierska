import styles from './NewsHeader.module.css';

export default function NewsHeader() {
	return (
		<header className={styles.heading}>
			<h1>News</h1>
			<p>
				Welcome to the ActivityHub News section! Stay updated with the latest
				happenings in the world of sports, community events, and ActivityHub
				features. Check back regularly to keep up with new announcements, tips,
				and exciting stories from our users.
			</p>
		</header>
	);
}
