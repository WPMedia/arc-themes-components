import { render, screen } from "@testing-library/react";

import Button from ".";

describe("Button", () => {
	it("should render string child", () => {
		render(<Button>Hello World</Button>);
		expect(screen.getByRole("button")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-button";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Button className={ADDITIONAL_CLASSES}>Hello World</Button>);
		const element = screen.getByRole("button");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render as an anchor", () => {
		const ORIGINAL_CLASSES = "c-button";

		render(<Button href="/">Hello World</Button>);
		const element = screen.getByRole("link");
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
