import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Carousel from ".";

// define full screen like in browsers that support full screen api
Object.defineProperty(global.document, "fullscreenEnabled", {
	value: true,
});

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

	it("should render carousel after resize", async () => {
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

		// Change the viewport to 500px.
		global.innerWidth = 500;

		// Trigger the window resize event.
		await global.dispatchEvent(new Event("resize"));
		expect(screen.getByRole("region")).not.toBeNull();
	});

	it("should only render Carousel.Item children", () => {
		render(
			<Carousel id="Carousel-1" label="Carousel Label" slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Button id="a">Button</Carousel.Button>
			</Carousel>
		);
		expect(screen.getByRole("region")).not.toBeNull();
		expect(screen.queryAllByText("Button")).toHaveLength(0);
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
		expect(screen.queryAllByText("Previous")).toHaveLength(0);
	});

	it("should not render next button", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.getByRole("region", { name: "Carousel Label" })).not.toBeNull();
		expect(screen.queryAllByText("Next")).toHaveLength(0);
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
				nextButton={<button type="button">Next</button>}
				previousButton={<button type="button">Previous</button>}
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

	it("should render custom buttons and call their onClick events", async () => {
		const nextEvent = jest.fn();
		const prevEvent = jest.fn();
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				slidesToShow={1}
				nextButton={
					<button type="button" onClick={nextEvent}>
						Next
					</button>
				}
				previousButton={
					<button type="button" onClick={prevEvent}>
						Previous
					</button>
				}
			>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		await userEvent.click(screen.getByRole("button", { name: "Next" }));
		expect(nextEvent).toHaveBeenCalled();
		await userEvent.click(screen.getByRole("button", { name: "Previous" }));
		expect(prevEvent).toHaveBeenCalled();
	});

	it("should show full-screen button if full screen option enabled and use custom button", async () => {
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				fullScreenShowButton={<button type="button">Show Custom Full Screen</button>}
				fullScreenMinimizeButton={<button type="button">Hide Custom Full Screen</button>}
				enableFullScreen
			>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.queryAllByText("Show Custom Full Screen")).toHaveLength(1);
	});

	it("should show full-screen button if full screen option enabled and use default button", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" enableFullScreen>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.queryAllByText("Full Screen")).toHaveLength(1);
	});

	it("does not show full screen button default if disabled", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label">
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(screen.queryAllByText("Full Screen")).toHaveLength(0);
	});

	it("shows label if opted in", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" showLabel slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		// query by text returns null if not found
		const foundLabel = screen.queryByText("1 of 2");
		expect(foundLabel).not.toBeNull();
	});

	it("does not show label if not opted in", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		// query by text returns null if not found
		const foundLabel = screen.queryByText("1 of 2");
		expect(foundLabel).toBeNull();
	});

	it("shows custom label text if opted in and provides function", () => {
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				showLabel
				slidesToShow={1}
				pageCountPhrase={(currentSlide, totalSlides) =>
					`${currentSlide} of ${totalSlides} super cool images`
				}
			>
				<Carousel.Item label="Slide 1 of 5">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 5">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		// query by text returns null if not found
		const foundLabel = screen.queryByText("1 of 2 super cool images");
		expect(foundLabel).not.toBeNull();
	});
	it("shows additional controls next and previous if opted in", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1} showAdditionalSlideControls>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// previous button not visible yet on first render
		expect(screen.queryAllByText("<")).toHaveLength(0);

		// show next button
		expect(screen.queryAllByText(">")).toHaveLength(1);

		// click top next button
		await userEvent.click(screen.getByText(">"));

		await waitFor(() => {
			// show default previous button
			expect(screen.queryAllByText("<")).toHaveLength(1);

			// next button no longer visible as it's the last slide
			expect(screen.queryAllByText(">")).toHaveLength(0);
		});
	});
	it("shows additional controls next and previous if opted in and custom buttons", async () => {
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				slidesToShow={1}
				showAdditionalSlideControls
				additionalNextButton={<button type="button">Next Custom</button>}
				additionalPreviousButton={<button type="button">Previous Custom</button>}
			>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// previous button not visible yet on first render
		expect(screen.queryAllByText("Previous Custom")).toHaveLength(0);

		// show next button
		expect(screen.queryAllByText("Next Custom")).toHaveLength(1);

		// click top next button
		await userEvent.click(screen.getByText("Next Custom"));

		await waitFor(() => {
			// show default previous button
			expect(screen.queryAllByText("Previous Custom")).toHaveLength(1);

			// next button no longer visible as it's the last slide
			expect(screen.queryAllByText("Next Custom")).toHaveLength(0);
		});
	});
});
