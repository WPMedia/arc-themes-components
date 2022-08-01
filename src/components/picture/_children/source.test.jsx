import { render } from "@testing-library/react";

import Source from "./source";

describe("Source subcomponent", () => {
	it("render null if src property is not provided", () => {
		const { container } = render(<Source media="(max-width: 799px)" />);
		expect(container.firstChild).toBeNull();
	});

	it("render null if media property is not provided", () => {
		const { container } = render(<Source src="test.jpeg" />);
		expect(container.firstChild).toBeNull();
	});

	it("render unresized image an auth key has not been provided", () => {
		const { container } = render(<Source src="test.jpeg" media="(max-width: 799px)" />);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<source
		  media="(max-width: 799px)"
		  srcset="test.jpeg"
		/>
	`);
	});
	it("render resized image an resizer options, including auth key, has been provided", () => {
		const { container } = render(
			<Source
				src="test.jpeg"
				media="(max-width: 799px)"
				resizerURL="http://www.test.org/"
				resizerOptions={{ auth: "fff1111", filter: 70, smart: true }}
			/>
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
		<source
		  class="c-picture__source"
		  media="(max-width: 799px)"
		  srcset="http://www.test.org/test.jpeg?auth=fff1111&filter=70&smart=true"
		/>
	`);
	});
});
