const BLOCK_CLASS_NAME = "c-carousel";

const IndicatorArea = ({ indicatorType, currentSlideNumber, totalSlideNumber, goToSlide }) => (
	<div className={`${BLOCK_CLASS_NAME}__indicator-container`}>
		{indicatorType === "dots" &&
			Array.from({ length: totalSlideNumber }, (_unusedValue, index) => (
				<button
					// todo: translation for slide number
					label={`Go to slide ${index + 1}`}
					type="button"
					onClick={() => goToSlide(index + 1)}
					className={[
						`${BLOCK_CLASS_NAME}__indicator-dots`,
						index === currentSlideNumber - 1 ? `${BLOCK_CLASS_NAME}__indicator-dots--active` : "",
					]
						.filter((potentiallyTruthyString) => potentiallyTruthyString)
						.join(" ")}
				/>
			))}
	</div>
);

export default IndicatorArea;
