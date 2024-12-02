import { useEffect, useState } from 'react';
// import { type EventType } from '../../../data/events';
import { type Profile } from '../../../data/user';
import PlayerItem from './PlayerItem';
import styles from './PlayersList.module.css';
// import { supabase } from '../../../lib/supabase';
import { usersService } from '../../../services/users';

type PlayersListProps = {
	playersId: string[];
	// selectedEvent: EventType;
};

export default function PlayersList({ playersId }: PlayersListProps) {
	const [playersData, setPlayersData] = useState<Profile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPlayersData() {
			try {
				if (playersId.length === 0) {
					setPlayersData([]);
					return;
				}

				const data = await usersService.getPlayersByIds(playersId);
				setPlayersData(data);
				setError(null);
			} catch (err) {
				console.error('Error fetching players:', err);
				setError('Failed to load players');
			} finally {
				setLoading(false);
			}
		}

		fetchPlayersData();
	}, [playersId]);

	if (loading) {
		return <div className={styles.message}>Loading players...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	if (!playersData.length) {
		return <div className={styles.message}>No players joined yet</div>;
	}

	return (
		<ul className={styles.playersList}>
			{playersData.map((player) => (
				<PlayerItem
					key={player.id}
					player={player}
					// selectedEvent={selectedEvent}
				/>
			))}
		</ul>
	);
}
