import PropTypes from "prop-types";
import Slider from "react-slick";

const Carousel = (props) => {
	const { children, className } = props;

	const COMPONENT_CLASS_NAME = "c-carousel";

	return (
		<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
			<Slider {...props}>{children}</Slider>
		</div>
	);
};

Carousel.defaultProps = {
	accessibility: true,
	adaptiveHeight: false,
	afterChange: null,
	appendDots: (dots) => {
		<ul>{dots}</ul>;
	},
	asNavFor: undefined,
	autoplay: false,
	autoplaySpeed: 500,
	beforeChange: null,
	centerMode: false,
	centerPadding: "50px",
	customPaging: (i) => {
		<button type="button">{i + 1}</button>;
	},
	dotsClass: "slick-dots",
	draggable: true,
	easing: "linear",
	fade: false,
	focusOnSelect: false,
	infinite: false,
	initialSlide: 0,
	lazyLoad: "progressive",
	onEdge: null,
	onInit: null,
	onReInit: null,
	pauseOnDotsHover: false,
	pauseOnFocus: false,
	pauseOnHover: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
	rows: 1,
	rtl: false,
	slide: "div",
	slidesPerRow: 1,
	slidesToScroll: 4,
	slidesToShow: 4,
	speed: 500,
	swipe: true,
	touchMove: true,
	touchThreshold: 5,
	useCSS: true,
	useTransform: true,
	vertical: false,
};

Carousel.propTypes = {
	/** Enable tabbing and arrow key navigation. */
	accessibility: PropTypes.bool,
	/** The slide's height is adjusted to the content height automatically. */
	adaptiveHeight: PropTypes.bool,
	/** Index change callback. `index => ...` */
	afterChange: PropTypes.func,
	/** Custom dots templates. Works same as customPaging. `(dot) => { <ul>{dot}</ul> }` */
	appendDots: PropTypes.func,
	/** Use interactive arrow buttons to move forward and back in displaying child components. */
	arrows: PropTypes.bool,
	/** provide ref to another slider and sync it with current slider. */
	asNavFor: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.object })]),
	/** Automatically advance slides. */
	autoplay: PropTypes.bool,
	/** Milliseconds between slide advancements. */
	autoplaySpeed: PropTypes.number,
	/** Index change callback. `(oldIndex, newIndex) => ...` */
	beforeChange: PropTypes.func,
	/** Center the current slides. */
	centerMode: PropTypes.bool,
	/** Pad the current slide(s) by a CSS space metric. */
	centerPadding: PropTypes.string,
	/** The text, images or any node that will be displayed within the component. */
	children: PropTypes.node.isRequired,
	/** Class name(s) that get appended to default class name of the component. */
	className: PropTypes.string,
	/** Custom paging templates. */
	customPaging: PropTypes.func,
	/** CSS class for dots. */
	dotsClass: PropTypes.string,
	/** Enable scrollable via dragging on desktop. */
	draggable: PropTypes.bool,
	/** CSS easing type to use for an index change. */
	easing: PropTypes.string,
	/** Fade when changing index of the  current slide(s). */
	fade: PropTypes.bool,
	/** Go to slide on click. */
	focusOnSelect: PropTypes.bool,
	/** Infinitely wrap around contents. */
	infinite: PropTypes.bool,
	/** Index of the first slide. */
	initialSlide: PropTypes.number,
	/** Lazy load slides. */
	lazyLoad: PropTypes.oneOf([null, "progressive", "ondemand"]),
	/** Edge dragged event in finite case. `direction => {...}` */
	onEdge: PropTypes.func,
	/** componentWillMount callback. */
	onInit: PropTypes.func,
	/** Callback after slides load lazily `slidesLoaded => {...}` */
	onLazyLoad: PropTypes.func,
	/** componentDidUpdate callback. */
	onReInit: PropTypes.bool,
	/** Callback after slide changes by swiping. */
	onSwipe: PropTypes.func,
	/** Prevents autoplay while hovering on dots. */
	pauseOnDotsHover: PropTypes.bool,
	/** Prevents autoplay while focused on slides. */
	pauseOnFocus: PropTypes.bool,
	/** Prevents autoplay while hovering on track. */
	pauseOnHover: PropTypes.bool,
	/** Customization based on breakpoints (desktop-first). */
	responsive: PropTypes.array,
	/** number of rows per slide in the slider, (enables grid mode) */
	rows: PropTypes.number,
	/** Use right to left slide order. */
	rtl: PropTypes.bool,
	/** Slide container type. */
	slide: PropTypes.string,
	/**  Number of slides to display in grid mode - (useful with rows option). */
	slidesPerRow: PropTypes.number,
	/** How many slides to show in one frame. */
	slidesToShow: PropTypes.number,
	/** How many slides to scroll at once. */
	slidesToScroll: PropTypes.number,
	/** Animation speed in milliseconds. */
	speed: PropTypes.number,
	/** Enable/disable swiping to change slides */
	swipe: PropTypes.bool,
	/** Animate on touch. */
	touchMove: PropTypes.bool,
	/** Maximum number of slides to move on touch. */
	touchThreshold: PropTypes.number,
	/** Enable/Disable CSS Transitions */
	useCSS: PropTypes.bool,
	/** Enable/Disable CSS transforms. */
	useTransform: PropTypes.bool,
	/** Allow variable width child components. */
	variableWidth: PropTypes.bool,
	/** Display in vertical orientation. */
	vertical: PropTypes.bool,
};

export default Carousel;
