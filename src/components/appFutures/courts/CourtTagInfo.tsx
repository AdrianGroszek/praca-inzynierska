import styles from './CourtTagInfo.module.css';
import TagSpan from '../../UI/TagSpan';
import { CourtType } from '../../../data/courts';
import { EventType } from '../../../data/events';

type CourtTagInfoProps = {
	court?: CourtType | null;
	event?: EventType | null;
};

export default function CourtTagInfo({ court, event }: CourtTagInfoProps) {
	if (court) {
		return (
			<div className={styles.bonusInfoContainer}>
				{court?.isFree ? (
					<TagSpan textColor='#cdf7f3' bgColor='rgba(205, 247, 243, 0.1)'>
						FREE
					</TagSpan>
				) : (
					<TagSpan textColor='#ffd972' bgColor='rgba(255, 217, 114, 0.1)'>
						PAID
					</TagSpan>
				)}
				{court?.category === 'Basketball' && (
					<TagSpan textColor='#fcc281' bgColor='rgba(252, 194, 129, 0.1)'>
						BASKETBALL
					</TagSpan>
				)}
				{court?.category === 'Football' && (
					<TagSpan textColor='#e7f6f8' bgColor='rgba(231, 246, 248, 0.1)'>
						FOOTBALL
					</TagSpan>
				)}
				{court?.category === 'Tennis' && (
					<TagSpan textColor='#dcffb8' bgColor='rgba(220, 255, 184, 0.1)'>
						TENNIS
					</TagSpan>
				)}
				{court?.category === 'Volleyball' && (
					<TagSpan textColor='#faf68a' bgColor='rgba(250, 246, 138, 0.1)'>
						VOLLEYBALL
					</TagSpan>
				)}
			</div>
		);
	}

	if (event) {
		return (
			<div className={styles.bonusInfoContainer}>
				{event?.isFree ? (
					<TagSpan textColor='#cdf7f3' bgColor='rgba(205, 247, 243, 0.1)'>
						FREE
					</TagSpan>
				) : (
					<TagSpan textColor='#ffd972' bgColor='rgba(255, 217, 114, 0.1)'>
						PAID
					</TagSpan>
				)}
				{event?.category === 'Basketball' && (
					<TagSpan textColor='#fcc281' bgColor='rgba(252, 194, 129, 0.1)'>
						BASKETBALL
					</TagSpan>
				)}
				{event?.category === 'Football' && (
					<TagSpan textColor='#e7f6f8' bgColor='rgba(231, 246, 248, 0.1)'>
						FOOTBALL
					</TagSpan>
				)}
				{event?.category === 'Tennis' && (
					<TagSpan textColor='#dcffb8' bgColor='rgba(220, 255, 184, 0.1)'>
						TENNIS
					</TagSpan>
				)}
				{event?.category === 'Volleyball' && (
					<TagSpan textColor='#faf68a' bgColor='rgba(250, 246, 138, 0.1)'>
						VOLLEYBALL
					</TagSpan>
				)}
			</div>
		);
	}
}
