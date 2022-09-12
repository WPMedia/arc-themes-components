import { render, screen } from "@testing-library/react";
import IndicatorArea from "./IndicatorArea";

describe("Indicator Area", () => {
	it("should render null if no indicator type is provided", () => {
		const { container } = render(<IndicatorArea />);
		expect(container).toBeEmptyDOMElement();
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
	it("should call go to slide function if button is clicked showing the slide clicked for type thumbnail", () => {
		const goToSlide = jest.fn();
		const { container } = render(
			<IndicatorArea indicatorType="thumbnails" totalSlideNumber={3} goToSlide={goToSlide}>
				<div key="1" />
				<div key="2" />
				<div key="3" />
			</IndicatorArea>
		);
		container.querySelectorAll(".c-carousel__indicator-thumbnail")[1].click();
		expect(goToSlide).toHaveBeenCalledWith(2);
	});

	it("should render a thumbnail container if indicator type is thumbnails", () => {
		const { container } = render(<IndicatorArea indicatorType="thumbnails" />);
		expect(container.querySelector(".c-carousel__indicator-thumbnails-container")).not.toBeNull();
	});
	it("should render thumbnail indicator as a child for a thumbnail", () => {
		render(
			<IndicatorArea indicatorType="thumbnails">
				<div data-testid="test-child" />
			</IndicatorArea>
		);
		expect(screen.getAllByTestId("test-child").length).toBe(1);
	});
	it("should set the second slide to be active on the thumbnail type", () => {
		const scrollViewMock = jest.fn();
		window.HTMLElement.prototype.scrollIntoView = scrollViewMock;

		const { container } = render(
			<IndicatorArea indicatorType="thumbnails" currentSlideNumber={2}>
				<div data-testid="test-child-1" />
				<div data-testid="test-child-2" />
			</IndicatorArea>
		);

		const activeThumbnail = container.querySelector(".c-carousel__indicator-thumbnail--active");
		expect(activeThumbnail).not.toBeNull();

		// check that the scroll into view mock has been called
		expect(scrollViewMock).toHaveBeenCalled();

		expect(activeThumbnail.children[0].dataset.testid).toBe("test-child-2");
	});
	it("should set the second slide to be active if current slide number is 2 for dots", () => {
		const scrollViewMock = jest.fn();
		window.HTMLElement.prototype.scrollIntoView = scrollViewMock;
		const { container } = render(
			<IndicatorArea indicatorType="dots" totalSlideNumber={3} currentSlideNumber={2} />
		);
		expect(container.querySelectorAll(".c-carousel__indicator-dot--active").length).toBe(1);
		expect(container.querySelectorAll(".c-carousel__indicator-dot")[1]).toHaveClass(
			"c-carousel__indicator-dot--active"
		);

		// check that the scroll into view mock has not been called
		// only call scroll into view for the thumbnails -- not dots
		expect(scrollViewMock).not.toHaveBeenCalled();
	});
});
