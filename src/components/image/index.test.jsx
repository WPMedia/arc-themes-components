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

	it("should render additional classes with an auth token", () => {
		const ORIGINAL_CLASSES = "c-image";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Image
				className={ADDITIONAL_CLASSES}
				resizedOptions={{ auth: "secret" }}
				src="test-image.jpg"
			/>
		);

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
		render(
			<Image src="test-image.jpg" resizedOptions={{ width: 100, height: 100, auth: "secret" }} />
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).toHaveAttribute("width", "100");
	});

	it("should render only height if height and no width", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ height: 100, auth: "secret" }} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("height", "100");
		expect(element).not.toHaveAttribute("width");
	});

	it("should pass in a first option with ? into the source with the resized image option", () => {
		render(<Image src="test-image.jpg" resizedOptions={{ filter: 70, auth: "secret" }} />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg?filter=70&auth=secret");
	});

	it("should pass in many options into the source with the resized image option", () => {
		render(
			<Image src="test-image.jpg" resizedOptions={{ filter: 70, quality: 50, auth: "secret" }} />
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg?filter=70&quality=50&auth=secret");
	});

	it("should pass in boolean as a string into the source with the resized image option", () => {
		render(
			<Image src="test-image.jpg" resizedOptions={{ filter: true, fancy: false, auth: "secret" }} />
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg?filter=true&fancy=false&auth=secret");
	});

	it("should prefix the src with the resizer url and add query parameters", () => {
		render(
			<Image
				src="/test-image.jpg"
				resizerURL="https://resizer.example.com"
				resizedOptions={{ filter: 70, quality: 50, auth: "secret" }}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"src",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret"
		);
	});

	it("should handle width and height passed into responsive images and render srcset", () => {
		render(
			<Image
				src="/test-image.jpg"
				resizerURL="https://resizer.example.com"
				resizedOptions={{ filter: 70, quality: 50, height: 50, width: 100, auth: "secret" }}
				responsiveImages={[100, 200, 300]}
			/>
		);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute(
			"srcset",
			"https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=100&height=50 100w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=200&height=100 200w, https://resizer.example.com/test-image.jpg?filter=70&quality=50&auth=secret&width=300&height=150 300w"
		);
	});
});
