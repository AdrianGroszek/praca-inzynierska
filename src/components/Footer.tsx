import styles from './Footer.module.css';

import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			<ul>
				<li>
					<FaFacebookF />
				</li>
				<li>
					<FaInstagram />
				</li>
				<li>
					<FaXTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
				<li>
					<FaLinkedinIn />
				</li>
			</ul>
			<h3>ActivityHub</h3>
			<p>Copyright © 2024 ActivityHub, Inc.</p>
		</footer>
	);
}
