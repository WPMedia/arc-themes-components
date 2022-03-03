import { render, screen } from "@testing-library/react";

import Overline from ".";

describe("Overline", () => {
	it("should render string child", () => {
		render(<Overline>Hello World</Overline>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});
});
