import { render, screen } from "@testing-library/react";

import Date from ".";

describe("Date", () => {
	it("should render date string", () => {
		render(<Date dateTime="2018-03-05T20:00:00" dateString="March 5 at 8 at night" />);
		const foundDate = screen.queryByText("March 5 at 8 at night");

		expect(foundDate).not.toBeNull();
		expect(foundDate).toHaveClass("c-date");
		expect(foundDate).toHaveAttribute("datetime", "2018-03-05T20:00:00");
	});
});
