import { render, screen } from "@testing-library/react";

import Input from ".";

describe("Input", () => {
	it("should render string child", () => {
		render(<Input>Hello World</Input>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});
	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-input";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Input className={ADDITIONAL_CLASSES}>Hello World</Input>);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
