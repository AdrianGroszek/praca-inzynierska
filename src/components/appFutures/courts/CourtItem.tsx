import styles from './CourtItem.module.css';

import { FaUsers } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { type CourtType } from '../../../data/courts';
import { Link, useParams } from 'react-router-dom';
import { useCourts } from '../../../context/courts-context';
import TagSpan from '../../UI/TagSpan';
import CourtDescription from './CourtDescription';

type CourtItemProps = {
	court: CourtType;
};

export default function CourtItem({ court }: CourtItemProps) {
	const { selectCourt, selectedCourt } = useCourts();
	const { courtId } = useParams<{ courtId: string }>();

	const selectedStyle: string =
		courtId === court.id ? styles.activeCourtItem : '';

	function handleClick() {
		selectCourt(court);
	}

	return (
		<li>
			<Link
				to={`${court.id}`}
				className={`${styles.courtItem} ${selectedStyle}`}
				onClick={handleClick}>
				<img src={court.photos[0]} alt='' className={styles.courtImg} />
				<div className={styles.descriptionContainer}>
					<div className={styles.topContainer}>
						<p>{court.name}</p>
					</div>
					<div className={styles.bottomContainer}>
						<ul className={styles.courtDetailsList}>
							<li>
								<p>
									<FaUsers className={styles.detailsIcon} />
								</p>
								<span>Prayers {`${court.capacity}`}</span>
							</li>
							<li>
								<p>
									<FaLocationDot className={styles.detailsIcon} />
								</p>
								<span>{court.location}</span>
							</li>
						</ul>
						<div>
							{court.isFree ? (
								<TagSpan textColor='#cdf7f3' bgColor='rgba(205, 247, 243, 0.1)'>
									FREE
								</TagSpan>
							) : (
								<TagSpan textColor='#ffd972' bgColor='rgba(255, 217, 114, 0.1)'>
									PAID
								</TagSpan>
							)}
						</div>
					</div>
				</div>
			</Link>
			{court.id === selectedCourt?.id && (
				<div className={styles.showMobileEventDescription}>
					<CourtDescription />
				</div>
			)}
		</li>
	);
}
