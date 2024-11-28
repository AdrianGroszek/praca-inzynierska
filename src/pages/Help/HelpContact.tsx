import styles from './HelpContact.module.css';

export default function HelpContact() {
	return (
		<section className={styles.contactContainer}>
			<div>
				<h3 className={styles.contactHeading}>Contact Us</h3>
				<p>
					Can't find the answer you're looking for? Our support team is here to
					help!
				</p>
			</div>
			<div>
				<p className={styles.textCyan}>
					<span className={styles.boldText}>Email: </span>
					support@activityhub.test
				</p>
				<p className={styles.textCyan}>
					<span className={styles.boldText}>Phone: </span>+12 345 67 89 01
				</p>
				<p>
					<span className={styles.boldText}>Live Chat: </span>Available on our
					website from 9 AM to 5 PM (Mon-Fri)
				</p>
			</div>
			<p className={styles.textShortWidth}>
				We aim to respond to all inquiries within 24 hours. Thank you for being
				a part of the <span className={styles.textGradient}>ActivityHub</span>{' '}
				community!
			</p>
		</section>
	);
}
