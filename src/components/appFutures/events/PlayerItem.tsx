// import { useState } from 'react';
import styles from './PlayerItem.module.css';
import { type EventType } from '../../../data/events';
import { type Profile } from '../../../data/user';
import { useAuth } from '../../../context/AuthContext';
// import { useUser } from '../../../context/UserContext';
// import { eventsService } from '../../../services/events';
// import toast from 'react-hot-toast';

type PlayerItemProps = {
	player: Profile;
	selectedEvent: EventType;
};

export default function PlayerItem({ player, selectedEvent }: PlayerItemProps) {
	const { user } = useAuth();
	// const { profile } = useUser();
	// const [isRemoving, setIsRemoving] = useState(false);

	// const isCreator = selectedEvent.created_by === user?.id;
	const isCurrentUser = player.id === user?.id;

	// const handleRemovePlayer = async () => {
	// 	if (!user || !profile) return;

	// 	try {
	// 		setIsRemoving(true);

	// 		// Usuń gracza z wydarzenia
	// 		await eventsService.leaveEvent(selectedEvent.id, player.id);

	// 		toast.success(
	// 			isCurrentUser
	// 				? 'You left the event successfully!'
	// 				: `${player.first_name} has been removed from the event`
	// 		);
	// 	} catch (error) {
	// 		console.error('Error removing player:', error);
	// 		toast.error('Failed to remove player from event');
	// 	} finally {
	// 		setIsRemoving(false);
	// 	}
	// };

	return (
		<li className={styles.playerItem}>
			<div className={styles.playerInfo}>
				<img
					src={player.photo || '/default-avatar.png'}
					alt={`${player.first_name}'s profile`}
					className={styles.playerImage}
				/>
				<div className={styles.playerDetails}>
					<p className={styles.playerName}>
						{player.first_name} {player.last_name}
					</p>
					{isCurrentUser && <span className={styles.youBadge}>You</span>}
				</div>
			</div>

			{/* {(isCreator || isCurrentUser) && (
				<button
					onClick={handleRemovePlayer}
					disabled={isRemoving}
					className={styles.removeButton}
					aria-label={isCurrentUser ? 'Leave event' : 'Remove player'}>
					{isRemoving ? 'Removing...' : isCurrentUser ? 'Leave' : 'Remove'}
				</button>
			)} */}
		</li>
	);
}
