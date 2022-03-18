import { render, screen } from "@testing-library/react";

import MediaItem from ".";

describe("MediaItem", () => {
	it("should render title, credit and caption", () => {
		render(<MediaItem src="/image.png" title="title" credit="credit" caption="caption" />);

		expect(screen.queryByText("title")).not.toBeNull();

		expect(screen.queryByText("credit")).not.toBeNull();
		expect(screen.queryByText("caption")).not.toBeNull();
	});
	it("should render string child with additional classes", () => {
		const { container } = render(
			<MediaItem
				src="/image.png"
				title="title"
				credit="Credit"
				caption="caption"
				className="test-class"
			/>
		);
		expect(container.querySelector(".test-class")).not.toBeNull();
		expect(container.querySelector(".c-media-item")).not.toBeNull();
	});
	it("should render null if falsy title, formatted credit, caption, and src", () => {
		const { container } = render(<MediaItem src="" title="" credit="" caption="" />);
		expect(container.querySelector(".c-media-item")).toBeNull();
		expect(container.querySelector(".c-media-item__title")).toBeNull();
		expect(container.querySelector(".c-media-item__caption")).toBeNull();
		expect(container.querySelector(".c-media-item__credit")).toBeNull();
	});
	it("should not render title if no title", () => {
		const { container } = render(
			<MediaItem src="/image.png" title="" credit="Credit" caption="caption" />
		);
		expect(container.querySelector(".c-media-item__title")).toBeNull();
	});
	it("should not render credit if no caption", () => {
		const { container } = render(
			<MediaItem src="/image.png" title="title" credit="credit" caption="" />
		);
		expect(container.querySelector(".c-media-item__caption")).toBeNull();
	});
	it("should not render caption if empty object credit causing falsy string", () => {
		const { container } = render(
			<MediaItem src="/image.png" title="title" credit="" caption="caption" />
		);
		expect(container.querySelector(".c-media-item__credit")).toBeNull();
	});
	it("should take in html for the title prop", () => {
		render(
			<MediaItem
				src="/image.png"
				title="<p>title something special</p>"
				credit="Credit"
				caption="caption"
			/>
		);
		expect(screen.queryByText("title something special")).not.toBeNull();
	});
	it("should take in html for the caption prop", () => {
		render(
			<MediaItem
				src="/image.png"
				title="title"
				credit="Credit"
				caption="<dialog data-testid='html-example-as-props'>caption</dialog>"
			/>
		);
		expect(screen.queryByText("caption")).not.toBeNull();
		const exampleHtmlCaptionProp = screen.getByTestId("html-example-as-props");
		expect(exampleHtmlCaptionProp).not.toBeNull();
	});
	it("should take in html for the credit prop", () => {
		render(
			<MediaItem
				src="/image.png"
				title="title"
				credit="<dialog data-testid='html-example-as-props'>Credit</dialog>"
				caption="caption"
			/>
		);
		expect(screen.queryByText("Credit")).not.toBeNull();
		const exampleHtmlCreditProp = screen.getByTestId("html-example-as-props");
		expect(exampleHtmlCreditProp).not.toBeNull();
	});
	it("should render image", () => {
		render(<MediaItem src="test-image.jpg" />);
		const element = screen.getByRole("img");
		expect(element).toHaveAttribute("src", "test-image.jpg");
		expect(element).toHaveAttribute("alt", "");
	});
	it("should not render image but other fields there", () => {
		render(<MediaItem src="" title="This is a title" />);
		// returns null if no elements match
		expect(screen.queryByRole("img")).toBeNull();
	});
});
