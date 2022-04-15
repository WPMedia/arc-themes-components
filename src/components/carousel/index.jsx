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
	id,
	label,
	nextButton,
	previousButton,
	slidesToShow,
	...rest
}) => {
	const [slide, setSlide] = useState(slidesToShow);
	const [position, setPosition] = useState(0);
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
			<div className={`${COMPONENT_CLASS_NAME}__top-actions`}>
				<p className={`${COMPONENT_CLASS_NAME}__image-counter-label`}>Label</p>
			</div>
			<div
				className="c-carousel__track"
				style={{ transform: `translate3d(${position}%, 0px, 0px)` }}
			>
				{carouselItems.map((component) => component)}
			</div>

			<div className="c-carousel__actions">
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
};

export default Carousel;
