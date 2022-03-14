import { render } from "@testing-library/react";

import Separator from ".";

describe("Separator", () => {
	it("should render base class", () => {
		const { container } = render(<Separator />);
		const renderedSeparator = container.querySelector(".c-separator");
		expect(renderedSeparator).not.toBeNull();
	});
	it("should render additional class", () => {
		const ORIGINAL_CLASSES = "c-separator";
		const ADDITIONAL_CLASS = "additionalClass1";
		const { container } = render(<Separator className={ADDITIONAL_CLASS} />);
		expect(container.querySelector(`.${ORIGINAL_CLASSES}`)).not.toBeNull();
		expect(container.querySelector(`.${ADDITIONAL_CLASS}`)).not.toBeNull();
	});
	xit("should render custom separator string", () => {
		const { container } = render(<Separator separatorString="🚨" />);
		const renderedSeparator = container.querySelector(".c-separator");
		expect(renderedSeparator).not.toBeNull();
		expect(renderedSeparator.getAttribute("data-separator-string")).toBe("🚨");
	});
});
