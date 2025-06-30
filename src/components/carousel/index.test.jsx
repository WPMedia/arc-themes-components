import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventEmitter from "../../utils/event-emitter";

import Carousel from ".";

// define full screen like in browsers that support full screen api
Object.defineProperty(global.document, "fullscreenEnabled", {
	value: true
});

jest.mock("../../utils/event-emitter", () => ({
	dispatch: jest.fn()
}));

jest.mock(
	"./_children/DotIndicatorArea",
	() =>
		function MockDotIndicator() {
			return <div data-testid="dot-indicator-area" />;
		}
);

jest.mock(
	"./_children/ThumbnailIndicatorArea",
	() =>
		function MockThumbnailIndicator() {
			return <div data-testid="thumbnail-indicator-area" />;
		}
);

// mock accessibility to ensure that the carousel renders match media for reduce motion
Object.defineProperty(global.window, "matchMedia", {
	value: () => true
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

	it("clamps the slide to maxSlide if slide is out of bounds after slides are removed and resized", async () => {
		// Start with 3 slides
		const { rerender } = render(
			<Carousel id="carousel-clamp" label="Clamp Test" slidesToShow={1}>
				<Carousel.Item label="Slide 1">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// Move to the last slide (slide = 3)
		let nextButton = screen.getByRole("button", { name: /next/i });
		await userEvent.click(nextButton);
		nextButton = screen.getByRole("button", { name: /next/i });
		await userEvent.click(nextButton);

		// Now remove a slide so maxSlide is 2, but slide is still 3 (out of bounds)
		rerender(
			<Carousel id="carousel-clamp" label="Clamp Test" slidesToShow={1}>
				<Carousel.Item label="Slide 1">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// Trigger resize to invoke the clamp logic
		global.innerWidth = 500;
		await global.dispatchEvent(new Event("resize"));

		// Wait for the carousel to update, then check that the next button is not present (slide was clamped)
		await waitFor(() => {
			expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
		});
	});

	it("should not render the next button when at the last slide", async () => {
		render(
			<Carousel id="carousel-last-slide" label="Last Slide Test" slidesToShow={1}>
				<Carousel.Item label="Slide 1">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		// Move to the last slide
		let nextButton = screen.getByRole("button", { name: /next/i });
		await userEvent.click(nextButton);
		nextButton = screen.getByRole("button", { name: /next/i });
		await userEvent.click(nextButton);

		// Now we should be at the last slide, and the next button should not be rendered
		expect(screen.queryByRole("button", { name: /next/i })).not.toBeInTheDocument();
	});

	it("should not show whitespace at the start or end when resized", async () => {
		render(
			<Carousel id="carousel-resize" label="Carousel Label" slidesToShow={2}>
				<Carousel.Item label="Slide 1 of 4">
					<div style={{ width: 100, height: 100, background: "red" }} />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 4">
					<div style={{ width: 100, height: 100, background: "green" }} />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 4">
					<div style={{ width: 100, height: 100, background: "blue" }} />
				</Carousel.Item>
				<Carousel.Item label="Slide 4 of 4">
					<div style={{ width: 100, height: 100, background: "yellow" }} />
				</Carousel.Item>
			</Carousel>
		);

		// Simulate a resize event
		global.innerWidth = 800;
		await global.dispatchEvent(new Event("resize"));

		// Wait for the track to appear in the DOM
		await waitFor(() => {
			expect(screen.getByTestId("carousel-track")).toBeInTheDocument();
		});
		const trackStart = screen.getByTestId("carousel-track");
		const { transform: transformStart } = trackStart.style;
		const matchStart = /translate3d\((-?\d+)px/.exec(transformStart);
		const offsetStart = matchStart ? parseInt(matchStart[1], 10) : 0;
		expect(offsetStart).toBeLessThanOrEqual(0);

		// Move to the last slide and resize again
		const nextButton = screen.queryByRole("button", { name: /next/i });
		if (nextButton) {
			await userEvent.click(nextButton);
			await userEvent.click(nextButton);
		}

		global.innerWidth = 600;
		await global.dispatchEvent(new Event("resize"));

		// Wait for the track to appear in the DOM after resize
		await waitFor(() => {
			expect(screen.getByTestId("carousel-track")).toBeInTheDocument();
		});
		const trackEnd = screen.getByTestId("carousel-track");
		const { transform: transformEnd } = trackEnd.style;
		const matchEnd = /translate3d\((-?\d+)px/.exec(transformEnd);
		const offsetEnd = matchEnd ? parseInt(matchEnd[1], 10) : 0;
		expect(offsetEnd).toBeLessThanOrEqual(0);
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
		jest.spyOn(document, "addEventListener").mockImplementationOnce((_, callback) => {
			callback();
		});
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
		// document.fullscreenEnabled = false;
		// document.webkitFullscreenEnabled = true;
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

	it("shows start Autoplay when opting into Autoplay", () => {
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
		const foundLabel = screen.queryByText("Start Autoplay");
		expect(foundLabel).not.toBeNull();
	});

	it("does not show start Autoplay when opting into Autoplay", () => {
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
		const foundLabel = screen.queryByText("Start Autoplay");
		expect(foundLabel).toBeNull();
	});

	it("shows additional controls next and previous if opted in", async () => {
		const { container } = render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1} showAdditionalSlideControls>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		const controlsArea = container.querySelector(".c-carousel__counter-controls-container");

		// show next button
		expect(controlsArea.querySelectorAll(".c-carousel__button--additional-next")).toHaveLength(1);

		// show svg within controls area additional next button
		expect(controlsArea.querySelector(".c-carousel__button--additional-next svg")).not.toBeNull();

		// previous button not visible yet on first render
		expect(controlsArea.querySelectorAll(".c-carousel__button--additional-previous")).toHaveLength(
			0
		);

		// click top next button
		await userEvent.click(controlsArea.querySelector(".c-carousel__button--additional-next"));

		await waitFor(() => {
			const updatedControlsArea = container.querySelector(
				".c-carousel__counter-controls-container"
			);

			// next button no longer visible as it's the last slide
			expect(
				updatedControlsArea.querySelectorAll(".c-carousel__button--additional-next")
			).toHaveLength(0);

			// show default previous button
			expect(
				updatedControlsArea.querySelectorAll(".c-carousel__button--additional-previous")
			).toHaveLength(1);
			// show svg within controls area additional previous button
			expect(
				controlsArea.querySelector(".c-carousel__button--additional-previous svg")
			).not.toBeNull();
		});
	});

	it("hides additional controls if only one child and opted in", async () => {
		const { container } = render(
			<Carousel id="carousel-2" label="Carousel Label" showAdditionalSlideControls>
				<Carousel.Item label="Slide 1 of 1">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		const controlsArea = container.querySelector(".c-carousel__counter-controls-container");

		// hide previous button
		expect(controlsArea.querySelectorAll(".c-carousel__button--additional-previous")).toHaveLength(
			0
		);
	});

	it("renders a custom start autoplay button", async () => {
		const customStartButtonText = "Start that autoplay already!";
		const customStopButtonText = "Stop that autoplay already!";

		render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				showLabel
				slidesToShow={1}
				startAutoplayIcon={<span className="really-special-button">Special icon</span>}
				startAutoplayText={customStartButtonText}
				stopAutoplayText={customStopButtonText}
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
		const foundStartLabel = screen.queryByText(customStartButtonText);
		expect(foundStartLabel).not.toBeNull();

		const notFoundStopLabel = screen.queryByText(customStopButtonText);
		expect(notFoundStopLabel).toBeNull();

		const foundSpanIcon = screen.queryByText("Special icon");
		expect(foundSpanIcon).not.toBeNull();

		await userEvent.click(screen.getByRole("button", { name: "Start automatic slide show" }));
		await waitFor(() => {
			const notFoundStartLabel = screen.queryByText(customStartButtonText);
			expect(notFoundStartLabel).toBeNull();
			const foundStopLabel = screen.queryByText(customStopButtonText);
			expect(foundStopLabel).not.toBeNull();
			expect(screen.getByRole("button", { name: "Stop automatic slide show" })).toBeInTheDocument();
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

	it("should render carousel with an Ad placement", async () => {
		render(
			<Carousel
				id="carousel-ad-placement"
				label="Carousel Label"
				slidesToShow={1}
				adInterstitialClicks={1}
				adElement={<div>Ad Placement</div>}
			>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		expect(screen.getByRole("region")).not.toBeNull();
		expect(screen.queryAllByText("Ad Placement")).toHaveLength(0);

		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		await waitFor(() => {
			expect(screen.queryAllByText("Ad Placement")).toHaveLength(1);
		});
	});

	it("should render additional label as html", async () => {
		// divider and play as unicode characters
		const mockHTML = "&#8227;1 &#47; 2";
		const { container } = render(
			<Carousel
				id="carousel-2"
				label="Carousel Label"
				slidesToShow={1}
				showLabel
				showAdditionalSlideControls
				pageCountPhrase={() => mockHTML}
			>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		expect(
			container.querySelector(".c-carousel__image-counter-label").innerHTML
		).toMatchInlineSnapshot(`"‣1 / 2"`);
	});

	it("should not show indicator area by default", async () => {
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
		expect(screen.queryByTestId("indicator-area")).toBeNull();
	});

	it("should not show indicator area if indicators prop is none", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1} indicators="none">
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		expect(screen.queryByTestId("dot-indicator-area")).toBeNull();
		expect(screen.queryByTestId("thumbnail-indicator-area")).toBeNull();
	});

	it("should show indicator area if indicators is dots", async () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1} indicators="dots">
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		expect(screen.queryByTestId("dot-indicator-area")).not.toBeNull();
		expect(screen.queryByTestId("thumbnail-indicator-area")).toBeNull();
	});

	it("should show indicator area if indicators prop is thumbnails", () => {
		render(
			<Carousel id="carousel-2" label="Carousel Label" slidesToShow={1} indicators="thumbnails">
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		expect(screen.queryByTestId("dot-indicator-area")).toBeNull();
		expect(screen.queryByTestId("thumbnail-indicator-area")).not.toBeNull();
	});

	it("should emit the expected events", async () => {
		render(
			<Carousel
				id="Carousel-1"
				label="Carousel Label"
				slidesToShow={1}
				enableAutoplay
				enableFullScreen
			>
				<Carousel.Item label="Slide 1 of 2">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 2">
					<div />
				</Carousel.Item>
			</Carousel>
		);
		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		expect(EventEmitter.dispatch).toHaveBeenLastCalledWith(
			"galleryImageNext",
			expect.objectContaining({ autoplay: false })
		);
		await userEvent.click(screen.getByRole("button", { name: "Previous Slide" }));
		expect(EventEmitter.dispatch).toHaveBeenLastCalledWith(
			"galleryImagePrevious",
			expect.objectContaining({ autoplay: false })
		);
		await userEvent.click(screen.getByRole("button", { name: "Start automatic slide show" }));
		expect(EventEmitter.dispatch).toHaveBeenLastCalledWith(
			"galleryAutoplayStart",
			expect.any(Object)
		);
		await userEvent.click(screen.getByRole("button", { name: "Stop automatic slide show" }));
		expect(EventEmitter.dispatch).toHaveBeenLastCalledWith(
			"galleryAutoplayStop",
			expect.any(Object)
		);
	});
});
