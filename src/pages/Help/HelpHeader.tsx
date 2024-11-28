import styles from './HelpHeader.module.css';

export default function HelpHeader() {
	return (
		<header className={styles.headerContainer}>
			<h2>Frequently Asked Questions</h2>
			<p>
				Welcome to the ActivityHub Help Center! Here, you'll find answers to
				frequently asked questions, guides on how to use our platform, and ways
				to get in touch with our support team. We're here to ensure you have the
				best experience possible.
			</p>
		</header>
	);
}
