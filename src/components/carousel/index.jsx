// import { useState } from 'react';
import Slider from "react-slick";

const Carousel = () => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
	};
	return (
		<div>
			<h2>Carousel</h2>
			<Slider {...settings}>
				<div>
					<h3>1</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
				<div>
					<h3>5</h3>
				</div>
				<div>
					<h3>6</h3>
				</div>
				<div>
					<h3>7</h3>
				</div>
				<div>
					<h3>8</h3>
				</div>
				<div>
					<h3>9</h3>
				</div>
				<div>
					<h3>10</h3>
				</div>
			</Slider>
		</div>
	);
};

export default Carousel();
