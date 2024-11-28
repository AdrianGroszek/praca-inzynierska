import styles from './CreateEventDescriptionSection.module.css';

import CreateFormImg from '../../assets/create-event-form.png';

import { FaStar } from 'react-icons/fa6';

type DescriptionType = {
	boldText: string;
	text: string;
};

const descriptionData: DescriptionType[] = [
	{
		boldText: 'Set Up Easily:',
		text: 'Choose the sport, date, time, and location for your event. Add a description and any specific requirements or rules.',
	},
	{
		boldText: 'Invite Participants:',
		text: 'Send invitations to friends, teammates, or open the event to the entire ActivityHub community. Reach out to local enthusiasts who share your passion.',
	},
	{
		boldText: 'Track Attendance:',
		text: 'Easily monitor who has RSVP d to your event. See who s coming, who s declined, and who hasn t responded yet. Keep track of any changes and send reminders to those who haven t replied.',
	},
	{
		boldText: 'Share Updates:',
		text: 'Keep everyone in the loop by sharing updates and important information about your event. Post reminders, changes in plans, or any last-minute details directly to the event page, ensuring all participants are well-informed.',
	},
];

export default function CreateEventDescriptionSection() {
	return (
		<section className={styles.createVizualizationSection}>
			<div className={styles.createImgContainer}>
				<img
					src={CreateFormImg}
					alt='Photo of the form showing how to create sport event.'
				/>
			</div>
			<div className={styles.createInfoContainer}>
				<h3>Create Your Own Event</h3>
				<p className={styles.description}>
					Have a game in mind? Organize your own sports events with just a few
					clicks. ActivityHub empowers you to become a host and bring together
					players for any sport you love. Our platform offers a seamless event
					creation process, allowing you to:
				</p>
				<ul>
					{descriptionData.map((item, index) => (
						<li key={index} className={styles.listItem}>
							<div className={styles.starContainer}>
								<FaStar className={styles.star} />
							</div>
							<p>
								<span>{item.boldText} </span>
								{item.text}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
