import { render, screen } from "@testing-library/react";

import Link from ".";

const LINK_DESTINATION = "https://www.arcxp.com/";
const LINK_TEXT = "Arc XP";

describe("Link", () => {
	it("should render string child", () => {
		render(<Link href={LINK_DESTINATION}>{LINK_TEXT}</Link>);

		expect(screen.queryByText(LINK_TEXT)).not.toBeNull();
	});
});
