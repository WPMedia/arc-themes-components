import { Children, cloneElement, useState } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";

import Button from "./_children/Button";
import Item from "./_children/Item";
import useInterval from "../../utils/use-interval/useInterval";

const COMPONENT_CLASS_NAME = "c-carousel";

const DefaultNextButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Next Slide"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--next`}
	>
		Next
	</Button>
);

const DefaultPreviousButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Previous Slide"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--previous`}
	>
		Previous
	</Button>
);

/* istanbul ignore next  */
const DefaultExitFullScreenButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Exit full screen mode displaying the carousel"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--exit-full-screen`}
	>
		Minimize Screen
	</Button>
);

const DefaultEnterFullScreenButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Enter full screen mode displaying the carousel"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--enter-full-screen`}
	>
		Full Screen
	</Button>
);

const DefaultStartAutoPlayButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Start rotating the slides"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--start-auto-play`}
	>
		Start AutoPlay
	</Button>
);

const DefaultStopAutoPlayButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Stop rotating the slides"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--stop-auto-play`}
	>
		Stop AutoPlay
	</Button>
);

const resolvedButton = (element, id, className, onClick) =>
	cloneElement(element, {
		"aria-controls": id,
		onClick: (e) => {
			onClick();
			if (element.props?.onClick) {
				element.props.onClick(e);
			}
		},
		className: `${COMPONENT_CLASS_NAME}__button ${className} ${element.props?.className}`,
	});

const Carousel = ({
	children,
	className,
	enableAutoplay,
	id,
	label,
	nextButton,
	pageCountPhrase,
	previousButton,
	showLabel,
	slidesToShow,
	startAutoPlayButton,
	stopAutoPlayButton,
	fullScreenShowButton,
	fullScreenMinimizeButton,
	enableFullScreen,
	...rest
}) => {
	// slidesToShow is a number of slides to show at once
	const [slide, setSlide] = useState(slidesToShow);
	const [position, setPosition] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isAutoPlaying, setIsAutoPlaying] = useState(false);
	const totalSlides = Children.count(children);
	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");

	const subComponents = Object.values(Carousel).map((subcomponentType) =>
		Children.map(children, (child) => (child?.type === subcomponentType ? child : null))
	);

	const childItems = Children.toArray(subComponents);

	const carouselItems = childItems.map((child, index) => {
		const viewable = index + 1 > slide - slidesToShow && index + 1 <= slide;
		return child.type === Item ? cloneElement(child, { viewable }) : null;
	});

	const previousSlide = () => {
		/* istanbul ignore next */
		if (slide - 1 < slidesToShow) {
			return;
		}
		setSlide(slide - 1);
		setPosition(position + 100 / slidesToShow);
	};

	const nextSlide = () => {
		/* istanbul ignore next */
		if (slide + 1 > carouselItems.length) {
			return;
		}
		setSlide(slide + 1);
		setPosition(position - 100 / slidesToShow);
	};

	const autoplaySlides = () => {
		if (slide + 1 > carouselItems.length) {
			// reset back to the first slide
			setSlide(slidesToShow);
			setPosition(0);
		} else {
			nextSlide();
		}
	};

	// a prefers-reduced-motion user setting must always override autoplay
	const autoplayEnabledAndAllowed =
		enableAutoplay && !!window.matchMedia("'(prefers-reduced-motion: reduce)");

	useInterval(autoplaySlides, autoplayEnabledAndAllowed && isAutoPlaying ? 4000 : null);

	/* istanbul ignore next  */
	const toggleFullScreen = () => {
		// id is the carousel id
		// the full screen element is the whole carousel
		const fullScreenElement = document.getElementById(id);

		if (document.fullscreenEnabled) {
			if (!document.fullscreenElement) {
				fullScreenElement.requestFullscreen().then(() => setIsFullScreen(true));
			} else {
				document.exitFullscreen().then(() => setIsFullScreen(false));
			}
		} else {
			// safari needs prefix
			// eslint-disable-next-line no-lonely-if
			if (document.webkitFullscreenEnabled) {
				if (!document.webkitFullscreenElement) {
					fullScreenElement.webkitRequestFullscreen().then(() => setIsFullScreen(true));
				} else {
					document.webkitExitFullscreen().then(() => setIsFullScreen(false));
				}
			}
		}
	};

	const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

	/* istanbul ignore next */
	const handlers = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => previousSlide(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const resolvedNextButton = nextButton ? (
		resolvedButton(nextButton, id, `${COMPONENT_CLASS_NAME}__button--next`, nextSlide)
	) : (
		<DefaultNextButton id={id} onClick={() => nextSlide()} />
	);

	const resolvedPreviousButton = previousButton ? (
		resolvedButton(previousButton, id, `${COMPONENT_CLASS_NAME}__button--previous`, previousSlide)
	) : (
		<DefaultPreviousButton id={id} onClick={() => previousSlide()} />
	);

	const resolvedFullScreenShowButton = fullScreenShowButton ? (
		resolvedButton(
			fullScreenShowButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--enter-full-screen`,
			toggleFullScreen
		)
	) : (
		<DefaultEnterFullScreenButton id={id} onClick={toggleFullScreen} />
	);

	const resolvedFullScreenMinimizeButton = fullScreenMinimizeButton ? (
		resolvedButton(
			fullScreenMinimizeButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--exit-full-screen`,
			toggleFullScreen
		)
	) : (
		<DefaultExitFullScreenButton id={id} onClick={toggleFullScreen} />
	);

	const resolvedStartAutoPlayButton = startAutoPlayButton ? (
		resolvedButton(
			startAutoPlayButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--start-auto-play`,
			toggleAutoPlay
		)
	) : (
		<DefaultStartAutoPlayButton id={id} onClick={toggleAutoPlay} />
	);

	const resolvedStopAutoPlayButton = startAutoPlayButton ? (
		resolvedButton(
			stopAutoPlayButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--stop-auto-play`,
			toggleAutoPlay
		)
	) : (
		<DefaultStopAutoPlayButton id={id} onClick={toggleAutoPlay} />
	);

	/* istanbul ignore next  */
	const fullScreenEnabledAllowed =
		(document.fullscreenEnabled || document.webkitFullscreenEnabled) && enableFullScreen;

	return (
		<div
			{...rest}
			className={containerClassNames}
			id={id}
			aria-label={label}
			role="region"
			aria-roledescription="carousel"
			style={{ "--carousel-slide-width": slidesToShow !== 4 ? `${100 / slidesToShow}%` : null }}
			{...handlers}
		>
			<div className={`${COMPONENT_CLASS_NAME}__controls`}>
				{showLabel ? (
					<p className={`${COMPONENT_CLASS_NAME}__image-counter-label`}>
						{pageCountPhrase(slide, totalSlides) || `${slide} of ${totalSlides}`}
					</p>
				) : null}
				{autoplayEnabledAndAllowed && !isAutoPlaying ? resolvedStartAutoPlayButton : null}
				{autoplayEnabledAndAllowed && isAutoPlaying ? resolvedStopAutoPlayButton : null}
				{/* only show button at all if enabled on the document */}
				{fullScreenEnabledAllowed && !isFullScreen ? resolvedFullScreenShowButton : null}
				{
					/* istanbul ignore next  */ fullScreenEnabledAllowed && isFullScreen
						? resolvedFullScreenMinimizeButton
						: null
				}
			</div>
			<div
				className={`${COMPONENT_CLASS_NAME}__track`}
				style={{ transform: `translate3d(${position}%, 0px, 0px)` }}
			>
				{carouselItems.map((component) => component)}
			</div>

			<div className={`${COMPONENT_CLASS_NAME}__actions`}>
				{slide !== slidesToShow ? resolvedPreviousButton : null}
				{slide !== carouselItems.length && carouselItems.length > 1 ? resolvedNextButton : null}
			</div>
		</div>
	);
};

Carousel.Button = Button;
Carousel.Item = Item;

Carousel.defaultProps = {
	enableAutoplay: false,
	pageCountPhrase: () => {},
	showLabel: false,
	slidesToShow: 4,
};

Carousel.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** Autoplay slides if user setting allows it */
	enableAutoplay: PropTypes.bool,
	/** A unique identifier for the carousel */
	id: PropTypes.string.isRequired,
	/** An accessible label */
	label: PropTypes.string.isRequired,
	/** Page count phrase text for internationalization, function takes in current, total */
	pageCountPhrase: PropTypes.func,
	/** Used to set a custom previous button, a cloned Carousel.Button element */
	previousButton: PropTypes.node,
	/** Used to set a custom next button, a cloned Carousel.Button element */
	nextButton: PropTypes.node,
	/** Show the current slide number */
	showLabel: PropTypes.bool,
	/** Number of slides to show in view */
	slidesToShow: PropTypes.number,
	/** Used to set a custom full screen show button, cloned with event handlers */
	fullScreenShowButton: PropTypes.node,
	/** Used to set a custom full screen exit button, cloned with event handlers */
	fullScreenMinimizeButton: PropTypes.node,
	/** Opt into showing a full screen toggle button. Uses defaults if no `fullScreenShowButton` or `fullScreenMinimizeButton` provided for respective button states */
	enableFullScreen: PropTypes.bool,
};

export default Carousel;
