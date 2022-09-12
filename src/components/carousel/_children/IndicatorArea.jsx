import { Children } from "react";

const BLOCK_CLASS_NAME = "c-carousel";

const IndicatorArea = ({
	children,
	currentSlideNumber,
	goToSlide,
	indicatorType,
	totalSlideNumber,
}) => {
	if (indicatorType === "dots") {
		return (
			<div className={`${BLOCK_CLASS_NAME}__indicator-dots-container`}>
				{Array.from({ length: totalSlideNumber }, (_unusedValue, index) => (
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
			</div>
		);
	}

	if (indicatorType === "thumbnails") {
		return (
			<div className={`${BLOCK_CLASS_NAME}__indicator-thumbnails-container`}>
				{Children.map(children, (child, index) => (
					<button
						aria-label={`Go to slide ${index + 1}`}
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
	}

	// neither supported indicator type
	return null;
};

export default IndicatorArea;
