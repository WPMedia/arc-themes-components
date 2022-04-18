import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Carousel from ".";

// define full screen like in browsers that support full screen api
Object.defineProperty(global.document, "fullscreenEnabled", {
	value: true,
});

// mock accessibility to ensure that the carousel renders match media for reduce motion
Object.defineProperty(global.window, "matchMedia", {
	value: () => true,
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
	it("shows start autoplay when opting into autoplay", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" showLabel slidesToShow={1} enableAutoplay>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		// query by text returns null if not found
		const foundLabel = screen.queryByText("Start AutoPlay");
		expect(foundLabel).not.toBeNull();
	});
	it("does not show start autoplay when opting into autoplay", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" showLabel slidesToShow={1}>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		// query by text returns null if not found
		const foundLabel = screen.queryByText("Start AutoPlay");
		expect(foundLabel).toBeNull();
	});
	it("shows stop autoplay when opted into autoplay and on click", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" showLabel slidesToShow={1} enableAutoplay>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		await userEvent.click(screen.getByRole("button", { name: "Start rotating the slides" }));
		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Stop rotating the slides" })).toBeInTheDocument();
		});
	});
	it("renders a custom start autoplay button", async () => {
		const customButtonText = "Start that autoplay already!";
		const customStartLabel = "Start the autoplay please";
		const customStopLabel = "Stop the autoplay please";
		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				showLabel
				slidesToShow={1}
				startAutoPlayButton={
					<button aria-label={customStartLabel} className="really-special-button" type="button">
						{customButtonText}
					</button>
				}
				stopAutoPlayButton={
					<button aria-label={customStopLabel} type="button">
						Stop that autoplay already!
					</button>
				}
				enableAutoplay
			>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// query by text returns null if not found
		const foundLabel = screen.queryByText(customButtonText);
		expect(foundLabel).not.toBeNull();
		expect(foundLabel.classList).toContain("really-special-button");

		await userEvent.click(screen.getByRole("button", { name: customStartLabel }));
		await waitFor(() => {
			expect(screen.getByRole("button", { name: customStopLabel })).toBeInTheDocument();
		});
	});
});
