import PropTypes from "prop-types";
import Slider from "react-slick";

const COMPONENT_CLASS_NAME = "c-carousel";

const Carousel = ({ children, className, sliderProps }) => (
	<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
		<Slider {...sliderProps}>{children}</Slider>
	</div>
);

Carousel.propTypes = {
	/** The text, images or any node that will be displayed within the component. */
	children: PropTypes.node.isRequired,
	/** Class name(s) that get appended to default class name of the component. */
	className: PropTypes.string,
	/** Settings object for the internal React Slick Slider */
	sliderProps: PropTypes.shape({}),
};

export default Carousel;
