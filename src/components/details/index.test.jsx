import { render, screen } from "@testing-library/react";

import Details from ".";

describe("Details", () => {
	it("should render summary and children", () => {
		render(<Details summary="Summary">Hello World</Details>);
		expect(screen.queryByText("Summary")).not.toBeNull();
		expect(screen.queryByText("Hello World")).not.toBeNull();
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-details";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Details className={ADDITIONAL_CLASSES} summary="Summary">
				Hello World
			</Details>
		);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render with custom Icon", () => {
		render(
			<Details summary="Summary" icon={<>Icon</>} iconPlacement="left">
				Hello World
			</Details>
		);
		expect(screen.queryByText("Summary")).not.toBeNull();
		expect(screen.queryByText("Hello World")).not.toBeNull();
		expect(screen.queryByText("Icon")).not.toBeNull();
	});
});
