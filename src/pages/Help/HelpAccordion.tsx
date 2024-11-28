import { useState } from 'react';
import styles from './HelpAccordion.module.css';

import { FaUserPlus } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { FaBaseballBatBall } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa6';
import { FaBug } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';

type AccordionDataType = {
	id: string;
	question: string;
	answer: string;
	icon: JSX.Element;
};

const accordionData: AccordionDataType[] = [
	{
		id: '1',
		question: 'How do I create an account?',
		answer:
			'To create an account, click on the "Sign Up" button on the homepage. Fill in your details, verify your email, and you re ready to go!',
		icon: <FaUserPlus />,
	},
	{
		id: '2',
		question: 'How do I join an event?',
		answer:
			'To join an event, click on the "Events" tab, select an event, and hit the "Join" button. Follow the prompts to complete your registration.',
		icon: <FaUsers />,
	},
	{
		id: '3',
		question: 'How do I create an event?',
		answer:
			'To create an event, log in, go to the "Create Event" section, fill in the event details, and click "Submit." Your event will be published immediately.',
		icon: <FaBaseballBatBall />,
	},
	{
		id: '4',
		question: 'How do I manage my profile?',
		answer:
			'To manage your profile, log in, click on your profile icon, select "Edit Profile," make your changes, and save.',
		icon: <FaBook />,
	},
	{
		id: '5',
		question: 'What should I do if I encounter an issue?',
		answer:
			'If you encounter an issue, visit the "Support" section, describe your problem in the contact form, and submit it. Our support team will assist you.',
		icon: <FaBug />,
	},
];

export default function HelpAccordion() {
	const [selected, setSelected] = useState<string | null>(null);

	function handleSelection(getCurrentId: string) {
		if (getCurrentId === selected) {
			setSelected(null);
		} else {
			setSelected(getCurrentId);
		}
	}

	return (
		<ul className={styles.accordianWrapper}>
			{accordionData.map((item) => (
				<li
					className={styles.accordionItem}
					key={item.id}
					onClick={() => handleSelection(item.id)}>
					<div className={styles.accordionIcon}>{item.icon}</div>
					<div className={styles.accordionTextContainer}>
						<div className={styles.accordionHeadingContainer}>
							<h3>{item.question}</h3>
							{selected === item.id ? <FaAngleUp /> : <FaAngleDown />}
						</div>
						<p
							className={styles.accordionAnswer}
							style={selected === item.id ? { maxHeight: '200px' } : undefined}>
							{item.answer}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}
