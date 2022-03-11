import { render, screen } from "@testing-library/react";

import Carousel from ".";

describe("Carousel", () => {
	it("should render string child", () => {
		render(<Carousel>Hello World</Carousel>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});
	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-carousel";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Carousel className={ADDITIONAL_CLASSES}>Hello World</Carousel>);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
