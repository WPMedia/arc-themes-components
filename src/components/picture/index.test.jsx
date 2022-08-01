import { render, screen } from "@testing-library/react";

import Picture from ".";
import Source from "./_children/source";

describe("Picture component", () => {
	it("render a picture element with a nested source element", () => {
		const { container } = render(
			<Picture>
				<Source src="test.jpeg" media="(max-width: 799px)" />
			</Picture>
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<picture
		  class="c-picture"
		>
		  <source
		    class="c-picture__source"
		    media="(max-width: 799px)"
		    srcset="test.jpeg"
		  />
		</picture>
	`);
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-picture";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Picture className={ADDITIONAL_CLASSES} data-testid="test-picture">
				<Source src="test.jpeg" media="(max-width: 799px)" />
			</Picture>
		);
		const element = screen.queryByTestId("test-picture");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
