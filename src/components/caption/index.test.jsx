import { render, screen } from "@testing-library/react";

import Caption from ".";

describe("Caption", () => {
	it("should render title, credit and caption", () => {
		render(<Caption title="title" credit="credit" caption="caption" />);

		expect(screen.queryByText("title")).not.toBeNull();
		expect(screen.queryByText("credit")).not.toBeNull();
		expect(screen.queryByText("caption")).not.toBeNull();
	});
	it("should render string child with additional classes", () => {
		const { container } = render(<Caption title="Hello World" className="test-class" />);
		// not quite best practice with rtl's methodology of not testing for classes
		// couldn't find a way to test for className without using its role or text
		expect(container.querySelector(".test-class")).not.toBeNull();
		expect(container.querySelector(".c-caption")).not.toBeNull();
	});
});
