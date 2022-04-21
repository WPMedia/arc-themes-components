import { Children, cloneElement, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import Icon from "../icon";
import Button from "./_children/Button";
import Item from "./_children/Item";

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

const DefaultAdditionalPreviousButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Previous Slide"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--additional-previous`}
	>
		<Icon name="ChevronLeft" />
	</Button>
);

const DefaultAdditionalNextButton = ({ id, onClick }) => (
	<Button
		id={id}
		onClick={onClick}
		label="Next Slide"
		className={`${COMPONENT_CLASS_NAME}__button ${COMPONENT_CLASS_NAME}__button--additional-next`}
	>
		<Icon name="ChevronRight" />
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

const getSlidesToShowFromDom = (id) => {
	if (typeof window === "undefined") {
		return 4;
	}

	return parseInt(getComputedStyle(id).getPropertyValue("--viewable-slides") || 4, 10);
};

const Carousel = ({
	additionalPreviousButton,
	additionalNextButton,
	children,
	className,
	id,
	label,
	nextButton,
	pageCountPhrase,
	previousButton,
	showAdditionalSlideControls,
	showLabel,
	slidesToShow,
	fullScreenShowButton,
	fullScreenMinimizeButton,
	enableFullScreen,
	...rest
}) => {
	const [slidesToShowInView, setSlidesToShowInView] = useState(0);
	const [slide, setSlide] = useState(0);
	const [position, setPosition] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const totalSlides = Children.count(children);
	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");
	const carouselElement = useRef();

	const subComponents = Object.values(Carousel).map((subcomponentType) =>
		Children.map(children, (child) => (child?.type === subcomponentType ? child : null))
	);

	useEffect(() => {
		setSlidesToShowInView(getSlidesToShowFromDom(carouselElement.current));
		setSlide(getSlidesToShowFromDom(carouselElement.current));
	}, [carouselElement]);

	useEffect(() => {
		const resizeFn = () => {
			if (
				slidesToShowInView === 0 ||
				getSlidesToShowFromDom(carouselElement.current) === slidesToShowInView
			) {
				return;
			}
			setSlidesToShowInView(getSlidesToShowFromDom(carouselElement.current));
			setSlide(getSlidesToShowFromDom(carouselElement.current));
			setPosition(0);
		};
		window.addEventListener("resize", resizeFn, false);
		return () => window.removeEventListener("resize", resizeFn, false);
	}, [carouselElement, slidesToShowInView]);

	const childItems = Children.toArray(subComponents);

	const carouselItems = childItems.map((child, index) => {
		const viewable = index + 1 > slide - slidesToShowInView && index + 1 <= slide;
		return child.type === Item ? cloneElement(child, { viewable }) : null;
	});

	const previousSlide = () => {
		/* istanbul ignore next */
		if (slide - 1 < slidesToShowInView) {
			return;
		}
		setSlide(slide - 1);
		const slideOffset =
			carouselElement.current.querySelector(".c-carousel__slide:nth-of-type(2)")?.offsetLeft || 0;
		setPosition(position + slideOffset);
	};

	const nextSlide = () => {
		/* istanbul ignore next */
		if (slide + 1 > carouselItems.length) {
			return;
		}
		setSlide(slide + 1);
		const slideOffset =
			carouselElement.current.querySelector(".c-carousel__slide:nth-of-type(2)")?.offsetLeft || 0;
		setPosition(position - slideOffset);
	};

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

	const resolvedAdditionalNextButton = additionalNextButton ? (
		resolvedButton(
			additionalNextButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--additional-next`,
			nextSlide
		)
	) : (
		<DefaultAdditionalNextButton id={id} onClick={nextSlide} />
	);

	const resolvedAdditionalPreviousButton = additionalPreviousButton ? (
		resolvedButton(
			additionalPreviousButton,
			id,
			`${COMPONENT_CLASS_NAME}__button--additional-previous`,
			previousSlide
		)
	) : (
		<DefaultAdditionalPreviousButton id={id} onClick={previousSlide} />
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
			style={{
				"--carousel-slide-width": `${100 / slidesToShowInView}%`,
				"--viewable-slides": slidesToShow,
			}}
			ref={carouselElement}
		>
			<div className={`${COMPONENT_CLASS_NAME}__controls`}>
				<div className={`${COMPONENT_CLASS_NAME}__expand-autoplay-container`}>
					{/* only show button at all if enabled on the document */}
					{fullScreenEnabledAllowed && !isFullScreen ? resolvedFullScreenShowButton : null}
					{
						/* istanbul ignore next  */ fullScreenEnabledAllowed && isFullScreen
							? resolvedFullScreenMinimizeButton
							: null
					}
				</div>
				<div className={`${COMPONENT_CLASS_NAME}__counter-controls-container`}>
					{showLabel ? (
						<p className={`${COMPONENT_CLASS_NAME}__image-counter-label`}>
							{pageCountPhrase(slide, totalSlides) || `${slide} of ${totalSlides}`}
						</p>
					) : null}
					{showAdditionalSlideControls ? (
						<div className={`${COMPONENT_CLASS_NAME}__additional-controls`}>
							{slide !== slidesToShow ? resolvedAdditionalPreviousButton : null}
							{slide !== carouselItems.length && carouselItems.length > 1
								? resolvedAdditionalNextButton
								: null}
						</div>
					) : null}
				</div>
			</div>
			<div
				className={`${COMPONENT_CLASS_NAME}__track`}
				style={{ transform: `translate3d(${position}px, 0px, 0px)` }}
				{...handlers}
			>
				{carouselItems}
			</div>

			<div className={`${COMPONENT_CLASS_NAME}__actions`}>
				{slide !== slidesToShowInView ? resolvedPreviousButton : null}
				{slide !== carouselItems.length && carouselItems.length > 1 ? resolvedNextButton : null}
			</div>
		</div>
	);
};

Carousel.Button = Button;
Carousel.Item = Item;

Carousel.defaultProps = {
	pageCountPhrase: () => {},
	showLabel: false,
};

Carousel.propTypes = {
	/** Used to set a custom additional next button, a cloned Carousel.Button element */
	additionalNextButton: PropTypes.node,
	/** Used to set a custom additional previous button, a cloned Carousel.Button element */
	additionalPreviousButton: PropTypes.node,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** A unique identifer for the carousel */
	id: PropTypes.string.isRequired,
	/** An accessible label */
	label: PropTypes.string.isRequired,
	/** Page count phrase text for internationalization, function takes in current, total */
	pageCountPhrase: PropTypes.func,
	/** Used to set a custom previous button, a cloned Carousel.Button element */
	previousButton: PropTypes.node,
	/** Used to set a custom next button, a cloned Carousel.Button element */
	nextButton: PropTypes.node,
	/** Show next and previous controls in addition to existing ones */
	showAdditionalSlideControls: PropTypes.bool,
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
