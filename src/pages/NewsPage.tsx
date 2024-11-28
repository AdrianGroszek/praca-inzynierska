import styles from './NewsPage.module.css';

import Wrapper from '../components/UI/Wrapper';
import NewsHeader from './News/NewsHeader';
import News from './News/News';
import StayConected from './News/StayConected';

export default function NewsPage() {
	return (
		<Wrapper>
			<div className={styles.newsWrapper}>
				<NewsHeader />
				<News />
				<StayConected />
			</div>
		</Wrapper>
	);
}
