import PropTypes from "prop-types";
// import { useState } from 'react';
import Slider from "react-slick";
// import { NextArrow, PrevArrow } from "./children/arrows";

const COMPONENT_CLASS_NAME = "c-carousel";

const Carousel = ({ children, className }) => {
	const settings = {
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		centerMode: false,
		infinite: false,
		dots: true,
	};
	return (
		<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
			<Slider {...settings}>{children}</Slider>
		</div>
	);
};

Carousel.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Carousel;
