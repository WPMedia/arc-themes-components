import { render, screen } from "@testing-library/react";

import Date from ".";

describe("Date", () => {
	it("should render string child", () => {
		render(<Date>Hello World</Date>);
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});
});
