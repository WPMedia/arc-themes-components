import { render } from "@testing-library/react";

import Video from ".";

const COMPONENT_CLASS_NAME = "c-video";

describe("Video", () => {
	it("should render only container", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
		expect(container.querySelector(".powa")).toBeNull();
	});

	it("should allow pass through of props", () => {
		const { container } = render(<Video id="custom-id" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveAttribute("id", "custom-id");
	});

	it("should render only container with additional class", () => {
		const { container } = render(<Video className="additionalClass" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveClass("additionalClass");
		expect(container.querySelector(".powa")).toBeNull();
	});

	it("should render container with aspect ratio", () => {
		const { container } = render(<Video aspectRatio={"4:3"} />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--aspect-ratio: 4/3");
	});

	it("should render container with aspect ratio of 16:9 if none is provided", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--aspect-ratio: 16/9");
	});

	it("should render container with vertical viewport percentage", () => {
		const { container } = render(<Video viewportPercentage={50} />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle("--height: 50");
	});

	it("should initiate video and render markup if not empty", () => {
		// mock window powa boot function to mimick powa
		window.powaBoot = jest.fn();
		const { container } = render(<Video embedMarkup="<div class='powa' />" />);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
	});

	it("should modify the embed markup aspect ratio if not equal to 16:9 and render markup if not empty", () => {
		// mock window powa boot function to mimick powa
		window.powaBoot = jest.fn();
		const { container } = render(
			<Video aspectRatio={"4:3"} embedMarkup="<div class='powa' data-aspect-ratio='0.562'/>" />
		);
		expect(window.powaBoot).toHaveBeenCalled();
		expect(container.querySelector(".powa")).not.toBeNull();
		expect(container.querySelector(".powa")).toHaveAttribute("data-aspect-ratio", "0.75");
	});
});
