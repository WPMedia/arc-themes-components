import { Children } from "react";

const BLOCK_CLASS_NAME = "c-carousel";

// get only the images from the nested sub components
// recursive loop to only find the Image type component
const getImages = (children) =>
	Children.map(children, (child) => {
		if (child.type.displayName === "Image") {
			return child;
		}
		if (child.props && child.props.children) {
			return getImages(child.props.children);
		}
		return null;
	});

const IndicatorArea = ({
	children,
	currentSlideNumber,
	goToSlide,
	indicatorType,
	totalSlideNumber,
}) => (
	<div className={`${BLOCK_CLASS_NAME}__indicator-container`}>
		{indicatorType === "dots" &&
			Array.from({ length: totalSlideNumber }, (_unusedValue, index) => (
				<button
					// todo: translation for slide number
					aria-label={`Go to slide ${index + 1}`}
					key={`carousel-indicator-dot-${index}`}
					type="button"
					onClick={() => goToSlide(index + 1)}
					className={[
						`${BLOCK_CLASS_NAME}__indicator-dot`,
						index === currentSlideNumber - 1 ? `${BLOCK_CLASS_NAME}__indicator-dot--active` : "",
					]
						.filter((potentiallyTruthyString) => potentiallyTruthyString)
						.join(" ")}
				/>
			))}
		{indicatorType === "thumbnails" &&
			getImages(children).map((child, index) => (
				<button
					label={`Go to slide ${index + 1}`}
					key={child.key}
					type="button"
					onClick={() => goToSlide(index + 1)}
					className={[
						`${BLOCK_CLASS_NAME}__indicator-thumbnail`,
						index === currentSlideNumber - 1
							? `${BLOCK_CLASS_NAME}__indicator-thumbnail--active`
							: "",
					]
						.filter((potentiallyTruthyString) => potentiallyTruthyString)
						.join(" ")}
				>
					{child}
				</button>
			))}
	</div>
);

export default IndicatorArea;
