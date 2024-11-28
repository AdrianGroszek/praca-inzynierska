import style from './ImageSliderHeader.module.css';

import imgBallOne from '../assets/ball-1.png';
import imgBallTwo from '../assets/ball-2.avif';
import imgBallThree from '../assets/ball-3.avif';
import imgBallFour from '../assets/ball-4.jpg';
import imgBallFive from '../assets/ball-5.webp';

export default function ImageSliderHeader() {
	return (
		<div className={style.slider}>
			<div className={style.slides}>
				<div className={style.slide}>
					<img id='slide-1' src={imgBallOne} alt='Football image' />
				</div>
				<div className={style.slide}>
					<img id='slide-2' src={imgBallThree} alt='Football image' />
				</div>
				<div className={style.slide}>
					<img id='slide-3' src={imgBallTwo} alt='Football image' />
				</div>
				<div className={style.slide}>
					<img id='slide-3' src={imgBallFour} alt='Football image' />
				</div>
				<div className={style.slide}>
					<img id='slide-3' src={imgBallFive} alt='Football image' />
				</div>
			</div>
		</div>
	);
}
