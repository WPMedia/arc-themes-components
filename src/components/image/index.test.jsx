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

	it("should render no height and no width if no height and width", () => {
		render(<Image src="test-image.jpg" />);
		const element = screen.getByRole("img");
		expect(element).not.toHaveAttribute("height");
		expect(element).not.toHaveAttribute("width");
	});

	it("should render height and width if height and width", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ width: 100, height: 100 }} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).toHaveAttribute("width", "100");
	});

	it("should render only height if height and no width", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ height: 100 }} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).not.toHaveAttribute("width");
	});
});
