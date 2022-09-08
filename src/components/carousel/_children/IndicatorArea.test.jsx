import { render } from "@testing-library/react";
import IndicatorArea from "./IndicatorArea";

describe("Indicator Area", () => {
	it("should render a parent component if no indicator type is provided", () => {
		const { container } = render(<IndicatorArea />);
		expect(container.querySelector(".c-carousel__indicator-container")).not.toBeNull();
	});
	it("should render dots if indicator type is dots and total slide number is set to an integer over 1", () => {
		const { container } = render(<IndicatorArea indicatorType="dots" totalSlideNumber={3} />);
		expect(container.querySelectorAll(".c-carousel__indicator-dot").length).toBe(3);
	});
	it("should call go to slide function if button is clicked showing the slide clicked", () => {
		const goToSlide = jest.fn();
		const { container } = render(
			<IndicatorArea indicatorType="dots" totalSlideNumber={3} goToSlide={goToSlide} />
		);
		container.querySelectorAll(".c-carousel__indicator-dot")[1].click();
		expect(goToSlide).toHaveBeenCalledWith(2);
	});
	it("should set the second slide to be active if current slide number is 2", () => {
		const { container } = render(
			<IndicatorArea indicatorType="dots" totalSlideNumber={3} currentSlideNumber={2} />
		);
		expect(container.querySelectorAll(".c-carousel__indicator-dot--active").length).toBe(1);
		expect(container.querySelectorAll(".c-carousel__indicator-dot")[1]).toHaveClass(
			"c-carousel__indicator-dot--active"
		);
	});
});
