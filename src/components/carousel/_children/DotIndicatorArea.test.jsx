import { render } from "@testing-library/react";
import DotIndicatorArea from "./DotIndicatorArea";

const DEFAULT_PROPS = {
	goToSlidePhrase: (targetSlide) => `Go to slide ${targetSlide}`,
	currentSlideNumber: 1,
	totalSlideNumber: 2,
	goToSlide: () => {},
};
describe("Dot Indicator Area", () => {
	it("should render amount of dots of total slide number", () => {
		const { container } = render(<DotIndicatorArea {...DEFAULT_PROPS} totalSlideNumber={3} />);
		expect(container.querySelectorAll(".c-carousel__indicator-dot").length).toBe(3);
	});
	it("should call go to slide function if button is clicked showing the slide clicked", () => {
		const goToSlide = jest.fn();
		const { container } = render(<DotIndicatorArea {...DEFAULT_PROPS} goToSlide={goToSlide} />);
		container.querySelectorAll(".c-carousel__indicator-dot")[1].click();
		expect(goToSlide).toHaveBeenCalledWith(2);
	});

	it("should set the second slide to be active if current slide number is 2 for dots", () => {
		const scrollViewMock = jest.fn();
		window.HTMLElement.prototype.scrollIntoView = scrollViewMock;
		const { container } = render(
			<DotIndicatorArea {...DEFAULT_PROPS} totalSlideNumber={3} currentSlideNumber={2} />
		);
		expect(container.querySelectorAll(".c-carousel__indicator-dot--active").length).toBe(1);
		expect(container.querySelectorAll(".c-carousel__indicator-dot")[1]).toHaveClass(
			"c-carousel__indicator-dot--active"
		);

		// check that the scroll into view mock has not been called
		// only call scroll into view for the thumbnails -- not dots
		expect(scrollViewMock).not.toHaveBeenCalled();
	});
	it("uses custom go slide phrase", () => {
		const { container } = render(
			<DotIndicatorArea
				{...DEFAULT_PROPS}
				goToSlidePhrase={(slideNumber) => `Go to the slide in the position of ${slideNumber}`}
			/>
		);
		expect(
			container.querySelectorAll(".c-carousel__indicator-dot--active")[0].getAttribute("aria-label")
		).toBe("Go to the slide in the position of 1");
	});
});
