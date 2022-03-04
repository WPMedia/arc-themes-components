import { render, screen } from "@testing-library/react";

import Image from ".";

describe("Image", () => {
	it("should render string child", () => {
		render(<Image src="test-image.jpg" />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg");
		expect(element).toHaveAttribute("alt", "");
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-image";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<Image className={ADDITIONAL_CLASSES} src="test-image.jpg" />);

		const element = screen.getByRole("img");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
