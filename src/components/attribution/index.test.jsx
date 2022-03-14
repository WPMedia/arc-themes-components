import { render, screen } from "@testing-library/react";

import Attribution from ".";

describe("Attribution", () => {
	it("should render string child", () => {
		render(<Attribution>Hello World</Attribution>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});
	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-attribution";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Attribution className={ADDITIONAL_CLASSES}>Hello World</Attribution>);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
