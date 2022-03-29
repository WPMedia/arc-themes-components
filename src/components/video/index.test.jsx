import { render } from "@testing-library/react";

import Video from ".";

const COMPONENT_CLASS_NAME = "c-video";

describe("Video", () => {
	it("should render only container", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
		expect(container.querySelector(".powa")).toBeNull();
	});
	it("should render only container with additional class", () => {
		const { container } = render(<Video className="additionalClass" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveClass("additionalClass");
		expect(container.querySelector(".powa")).toBeNull();
	});
	it("should render container with aspect ratio", () => {
		const { container } = render(<Video aspectRatio={16 / 9} />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveStyle(
			"--aspect-ratio: 1.7777777777777777"
		);
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
});
