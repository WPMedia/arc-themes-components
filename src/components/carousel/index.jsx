import { Children, cloneElement, useState } from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";

import Icon from "../icon";
import Item from "./_children/Item";

const COMPONENT_CLASS_NAME = "c-carousel";

const Carousel = ({ children, className, id, label, next, previous, slidesToShow }) => {
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
					slideNumber: index + 1,
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
					<button
						type="button"
						aria-label={previous.label}
						onClick={() => previousSlide()}
						className="c-carousel__button c-carousel__button--previous"
						aria-controls={id}
					>
						{previous.element ? previous.element : <Icon {...previous.iconProps} />}
					</button>
				) : null}
				{slide !== carouselItems.length ? (
					<button
						type="button"
						aria-label={next.label}
						onClick={() => nextSlide()}
						className="c-carousel__button c-carousel__button--next"
						aria-controls={id}
					>
						{next.element ? next.element : <Icon {...next.iconProps} />}
					</button>
				) : null}
			</div>
		</div>
	);
};

Carousel.Item = Item;

Carousel.defaultProps = {
	slidesToShow: 4,
	next: {
		label: "Next Slide",
		iconProps: {
			name: "ArrowRight",
			width: 24,
			height: 24,
		},
	},
	previous: {
		label: "Previous Slide",
		iconProps: {
			name: "ArrowLeft",
			width: 24,
			height: 24,
		},
	},
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
	/** Next Action */
	next: PropTypes.shape({
		label: PropTypes.string,
		element: PropTypes.node,
		iconProps: PropTypes.object,
	}),
	/** Previous Action */
	previous: PropTypes.shape({
		label: PropTypes.string,
		element: PropTypes.node,
		iconProps: PropTypes.object,
	}),
	/** Number of slides to show in view */
	slidesToShow: PropTypes.number,
};

export default Carousel;
