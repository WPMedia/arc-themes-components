import { render } from "@testing-library/react";

import Video from ".";

const COMPONENT_CLASS_NAME = "c-video";

describe("Video", () => {
	it("should render", () => {
		const { container } = render(<Video />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).not.toBeNull();
	});
	it("should render with additional class", () => {
		const { container } = render(<Video className="additionalClass" />);
		expect(container.querySelector(`.${COMPONENT_CLASS_NAME}`)).toHaveClass("additionalClass");
	});
});
