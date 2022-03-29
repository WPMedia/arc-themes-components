import { render, screen } from "@testing-library/react";

import Item from "./Item";

describe("Carousel.Item", () => {
	it("should render children", () => {
		render(
			<Item label="Carousel Label" viewable={true}>
				<div />
			</Item>
		);
		expect(screen.getByRole("group")).not.toBeNull();
	});

	it("should set an accessible label", () => {
		render(
			<Item label="Carousel Label" viewable={true}>
				<div />
			</Item>
		);
		expect(screen.getByRole("group", { name: "Carousel Label" })).not.toBeNull();
	});

	it("should not be accessible to assitive technology", () => {
		render(
			<Item label="Carousel Label" viewable={false}>
				<div />
			</Item>
		);
		expect(screen.getByRole("group", { hidden: true })).not.toBeNull();
	});
});
