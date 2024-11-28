import { EventType } from '../../../data/events';
import { UserType } from '../../../data/user';
import { users } from '../../../data/users';
import PlayerItem from './PlayerItem';
import styles from './PlayersList.module.css';

type PlayersListProps = {
	playersId: string[];
	selectedEvent: EventType;
};

export default function PlayersList({
	playersId,
	selectedEvent,
}: PlayersListProps) {
	const playersData: UserType[] = playersId
		.map((id) => users.find((user) => id === user.id))
		.filter((user) => user !== undefined);

	return (
		<ul className={styles.playersList}>
			{playersData.map((singlePlayer) => (
				<PlayerItem
					singlePlayer={singlePlayer}
					key={singlePlayer.id}
					selectedEvent={selectedEvent}
				/>
			))}
		</ul>
	);
}
