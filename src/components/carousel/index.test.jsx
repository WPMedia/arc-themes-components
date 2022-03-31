import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Carousel from ".";

describe("Carousel", () => {
	it("should render carousel", () => {
		render(
			<Carousel id="Carousel-1" label="Carousel Label" slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		expect(screen.getByRole("region")).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		const { container } = render(
			<Carousel id="carousel-2" label="Carousel Label" data-id="custom-id">
				<div />
			</Carousel>
		);
		expect(container.querySelector(".c-carousel")).toHaveAttribute("data-id", "custom-id");
	});

	it("should render additional classes", () => {
		const ORIGINAL_CLASSES = "c-carousel";
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(
			<Carousel id="carousel-2" label="Carousel Label" className={ADDITIONAL_CLASSES}>
				<div />
			</Carousel>
		);

		const element = screen.getByRole("region");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});

	it("should render next button only", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.getByRole("region", { name: "Carousel Label" })).not.toBeNull();
		expect(screen.getByRole("button")).not.toBeNull();
		expect(screen.queryAllByText("Previous Slide")).toHaveLength(0);
	});

	it("should render previous button after using next button and next button is removed", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label">
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.getByRole("region", { name: "Carousel Label" })).not.toBeNull();

		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Previous Slide" })).not.toBeNull();
		});

		expect(screen.queryByRole("button", { name: "Next Slide" })).toBeNull();
	});

	it("shows next and previous buttons when there are items previous and next", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={2}>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.getByRole("region", { name: "Carousel Label" })).not.toBeNull();

		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Previous Slide" })).not.toBeNull();
		});

		expect(screen.queryByRole("button", { name: "Next Slide" })).not.toBeNull();
	});

	it("should remove next button after using previous button", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label">
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.getByRole("region", { name: "Carousel Label" })).not.toBeNull();

		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Previous Slide" })).not.toBeNull();
		});
		await userEvent.click(screen.getByRole("button", { name: "Previous Slide" }));

		expect(screen.queryByRole("button", { name: "Previous Slide" })).toBeNull();
	});

	it("should render custom buttons", async () => {
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				slidesToShow={1}
				next={{ element: <span>Next</span> }}
				previous={{ element: <span>Previous</span> }}
			>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 5 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.queryAllByText("Next")).toHaveLength(1);
		await userEvent.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.queryAllByText("Previous")).toHaveLength(1);
	});
});