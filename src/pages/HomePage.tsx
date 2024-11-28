import Wrapper from '../components/UI/Wrapper';
import BrandsSlider from '../components/UI/BrandsSlider';

import HeaderSection from './Home/HeaderSection';
import LocalGamesDescription from './Home/LocalGamesDescription';
import ReviewSection from './Home/ReviewSection';
import CreateEventDescriptionSection from './Home/CreateEventDescriptionSection';
import WhyUsSection from './Home/WhyUsSection';

export default function HomePage() {
	return (
		<Wrapper>
			<HeaderSection />
			<BrandsSlider />
			<LocalGamesDescription />
			<ReviewSection />
			<CreateEventDescriptionSection />
			<WhyUsSection />
		</Wrapper>
	);
}
