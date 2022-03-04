import { render, screen } from "@testing-library/react";

import Caption from ".";

describe("Caption", () => {
	it("should render title, credit and caption", () => {
		render(
			<Caption
				title="title"
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption="caption"
			/>
		);

		expect(screen.queryByText("title")).not.toBeNull();
		// expect(screen.queryByText({{ by: [{ name: "bbbyyy" }], affiliation: [{ name: "affff" }] }})).not.toBeNull();
		// expect(screen.queryByText("caption")).not.toBeNull();
	});
	it("should render string child with additional classes", () => {
		const { container } = render(
			<Caption
				title="title"
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption="caption"
				className="test-class"
			/>
		);
		expect(container.querySelector(".test-class")).not.toBeNull();
		expect(container.querySelector(".c-caption")).not.toBeNull();
	});
	it("should render null if falsy title, formatted credit and caption", () => {
		const { container } = render(<Caption title="" credit={{}} caption="" />);
		expect(container.querySelector(".c-caption")).toBeNull();
		expect(container.querySelector(".c-caption__title")).toBeNull();
		expect(container.querySelector(".c-caption__caption")).toBeNull();
		expect(container.querySelector(".c-caption__credit")).toBeNull();
	});
	it("should not render title if no title", () => {
		const { container } = render(
			<Caption
				title=""
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption="caption"
			/>
		);
		expect(container.querySelector(".c-caption__title")).toBeNull();
	});
	it("should not render credit if no caption", () => {
		const { container } = render(
			<Caption
				title="title"
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption=""
			/>
		);
		expect(container.querySelector(".c-caption__caption")).toBeNull();
	});
	it("should not render caption if empty object credit causing falsy string", () => {
		const { container } = render(<Caption title="title" credit={{}} caption="caption" />);
		expect(container.querySelector(".c-caption__credit")).toBeNull();
	});
	it("should take in html for the title prop", () => {
		render(
			<Caption
				title="<p>title something special</p>"
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption="caption"
			/>
		);
		expect(screen.queryByText("title something special")).not.toBeNull();
	});
	it("should take in html for the caption prop", () => {
		render(
			<Caption
				title="title"
				credit={{ by: [{ name: "Joe Doe" }], affiliation: [{ name: "Stock Photo" }] }}
				caption="<dialog data-testid='html-example-as-props'>caption</dialog>"
			/>
		);
		expect(screen.queryByText("caption")).not.toBeNull();
		const exampleHtmlCaptionProp = screen.getByTestId("html-example-as-props");
		expect(exampleHtmlCaptionProp).not.toBeNull();
	});
});
