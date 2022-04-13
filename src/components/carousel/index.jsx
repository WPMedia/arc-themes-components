import { Children, cloneElement, useState } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";

import Button from "./_children/Button";
import Item from "./_children/Item";

const COMPONENT_CLASS_NAME = "c-carousel";

const DefaultNextButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Next Slide"
		className="c-carousel__button c-carousel__button--next"
	>
		Next
	</Button>
);

const DefaultPreviousButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Previous Slide"
		className="c-carousel__button c-carousel__button--previous"
	>
		Previous
	</Button>
);

const Carousel = ({
	children,
	className,
	id,
	label,
	nextButton,
	previousButton,
	slidesToShow,
	fullScreenShowButton,
	fullScreenMinimizeButton,
	enableFullScreenToggleButton,
	...rest
}) => {
	const [slide, setSlide] = useState(slidesToShow);
	const [position, setPosition] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);

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

	/* istanbul ignore next */
	const handlers = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => previousSlide(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const resolvedNextButton = nextButton ? (
		cloneElement(nextButton, {
			"aria-controls": id,
			onClick: (e) => {
				nextSlide();
				if (nextButton.props?.onClick) {
					nextButton.props.onClick(e);
				}
			},
			className: `c-carousel__button c-carousel__button--next ${previousButton.props?.className}`,
		})
	) : (
		<DefaultNextButton id={id} onClick={() => nextSlide()} />
	);

	const resolvedPreviousButton = previousButton ? (
		cloneElement(previousButton, {
			"aria-controls": id,
			onClick: (e) => {
				previousSlide();
				if (previousButton.props?.onClick) {
					previousButton.props.onClick(e);
				}
			},
			className: `c-carousel__button c-carousel__button--previous ${previousButton.props?.className}`,
		})
	) : (
		<DefaultPreviousButton id={id} onClick={() => previousSlide()} />
	);

	const resolvedFullScreenShowButton = fullScreenShowButton ? (
		cloneElement(fullScreenShowButton, {
			onClick: toggleFullScreen,
			className: `${COMPONENT_CLASS_NAME}__full-screen-toggle ${fullScreenShowButton.props?.className}`,
		})
	) : (
		<button
			onClick={toggleFullScreen}
			type="button"
			className={`${COMPONENT_CLASS_NAME}__full-screen-toggle`}
		>
			Full Screen
		</button>
	);

	const resolvedFullScreenMinimizeButton = fullScreenMinimizeButton ? (
		cloneElement(fullScreenMinimizeButton, {
			onClick: toggleFullScreen,
			className: `${COMPONENT_CLASS_NAME}__full-screen-toggle ${fullScreenMinimizeButton.props?.className}`,
		})
	) : (
		<button
			onClick={toggleFullScreen}
			type="button"
			className={`${COMPONENT_CLASS_NAME}__full-screen-toggle`}
		>
			Minimize Screen
		</button>
	);

	const fullScreenEnabledAllowed =
		(document.fullscreenEnabled || document.webkitFullscreenEnabled) &&
		enableFullScreenToggleButton;

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
			<div
				className="c-carousel__track"
				style={{ transform: `translate3d(${position}%, 0px, 0px)` }}
			>
				{carouselItems.map((component) => component)}
			</div>

			<div className="c-carousel__actions">
				{/* only show button at all if enabled on the document */}
				{fullScreenEnabledAllowed && !isFullScreen ? resolvedFullScreenShowButton : null}
				{fullScreenEnabledAllowed && isFullScreen ? resolvedFullScreenMinimizeButton : null}
				{slide !== slidesToShow ? resolvedPreviousButton : null}
				{slide !== carouselItems.length && carouselItems.length > 1 ? resolvedNextButton : null}
			</div>
		</div>
	);
};

Carousel.Button = Button;
Carousel.Item = Item;

Carousel.defaultProps = {
	slidesToShow: 4,
};

Carousel.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** A unique identifer for the carousel */
	id: PropTypes.string.isRequired,
	/** An accessible label */
	label: PropTypes.string.isRequired,
	/** Used to set a custom previous button, a cloned Carousel.Button element */
	previousButton: PropTypes.node,
	/** Used to set a custom next button, a cloned Carousel.Button element */
	nextButton: PropTypes.node,
	/** Number of slides to show in view */
	slidesToShow: PropTypes.number,
	/** Used to set a custom full screen show button, cloned with event handlers */
	fullScreenShowButton: PropTypes.node,
	/** Used to set a custom full screen exit button, cloned with event handlers */
	fullScreenMinimizeButton: PropTypes.node,
	/** Opt into showing a full screen toggle button. Uses defaults if no `fullScreenShowButton` or `fullScreenMinimizeButton` provided for respective button states */
	enableFullScreenToggleButton: PropTypes.bool,
};

export default Carousel;
