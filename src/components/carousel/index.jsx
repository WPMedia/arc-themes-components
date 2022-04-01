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
	next,
	nextButton,
	previousButton,
	previous,
	slidesToShow,
	...rest
}) => {
	const [slide, setSlide] = useState(slidesToShow);
	const [position, setPosition] = useState(0);
	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");

	const subComponents = Object.keys(Carousel).map((key) =>
		Children.map(children, (child) => (child?.type?.name === key ? child : null))
	);

	const childItems = Children.toArray(subComponents);

	const carouselItems = childItems.map((child, index) =>
		child.type.name === "Item"
			? cloneElement(child, {
					viewable: index + 1 > slide - slidesToShow && index + 1 <= slide,
			  })
			: null
	);

	const previousSlide = () => {
		if (slide - 1 < slidesToShow) {
			return;
		}
		setSlide(slide - 1);
		setPosition(position + 100 / slidesToShow);
	};

	const nextSlide = () => {
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

	return (
		<div
			{...rest}
			className={containerClassNames}
			id={id}
			aria-label={label}
			role="region"
			aria-roledescription="carousel"
			style={{ "--carousel-slide-width": slidesToShow !== 4 ? `${100 / slidesToShow}%` : null }}
		>
			<div
				className="c-carousel__track"
				style={{ transform: `translate3d(${position}%, 0px, 0px)` }}
				{...handlers}
			>
				{carouselItems.map((component) => component)}
			</div>

			<div className="c-carousel__actions">
				{slide !== slidesToShow ? (
					previousButton ? (
						cloneElement(previousButton, {
							"aria-controls": id,
							onClick: () => previousSlide(),
							className: "c-carousel__button c-carousel__button--previous",
						})
					) : (
						<DefaultPreviousButton id={id} onClick={() => previousSlide()} />
					)
				) : null}
				{slide !== carouselItems.length ? (
					nextButton ? (
						cloneElement(nextButton, {
							"aria-controls": id,
							onClick: () => nextSlide(),
							className: "c-carousel__button c-carousel__button--next",
						})
					) : (
						<DefaultNextButton id={id} onClick={() => nextSlide()} />
					)
				) : null}
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
	/** Number of slides to show in view */
	slidesToShow: PropTypes.number,

	previousButton: PropTypes.node,
	nextButton: PropTypes.node,
};

export default Carousel;
