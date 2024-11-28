import styles from './HelpPage.module.css';

import Wrapper from '../components/UI/Wrapper';
import HelpContact from './Help/HelpContact';
import HelpHeader from './Help/HelpHeader';
import HelpAccordion from './Help/HelpAccordion';

export default function HelpPage() {
	return (
		<Wrapper>
			<main className={styles.helpPageWrapper}>
				<HelpHeader />
				<HelpAccordion />
				<HelpContact />
			</main>
		</Wrapper>
	);
}
