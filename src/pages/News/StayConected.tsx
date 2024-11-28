import styles from './StayConected.module.css';

import { FaFacebookF } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';

export default function StayConected() {
	return (
		<section className={styles.stayConnectedContainer}>
			<h3>Stay Contected</h3>
			<p>
				Follow us on social media and subscribe to our newsletter to stay
				up-to-date with the latest news, events, and features from ActivityHub.
			</p>
			<div className={styles.mediaContainer}>
				<div>
					<FaFacebookF className={styles.icon} />
				</div>
				<div>
					<FaXTwitter className={styles.icon} />
				</div>
				<div>
					<FaInstagram className={styles.icon} />
				</div>
				<div>
					<FaYoutube className={styles.icon} />
				</div>
			</div>
			<p>
				Thank you for being a part of the ActivityHub community! Together, we’re
				making sports and fitness more accessible and enjoyable for everyone.
			</p>
		</section>
	);
}
