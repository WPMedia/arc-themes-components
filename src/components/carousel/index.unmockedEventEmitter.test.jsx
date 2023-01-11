import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventEmitter from "../../utils/event-emitter";

import Carousel from ".";

// define full screen like in browsers that support full screen api
Object.defineProperty(global.document, "fullscreenEnabled", {
	value: true,
});

// mock accessibility to ensure that the carousel renders match media for reduce motion
Object.defineProperty(global.window, "matchMedia", {
	value: () => true,
});

describe("Unmocked Events Carousel", () => {
	it("should keep subscriptions even after re-render and report correct details", async () => {
		const nextEvent = jest.fn();
		const previousEvent = jest.fn();
		const startEvent = jest.fn();
		const stopEvent = jest.fn();

		EventEmitter.subscribe("galleryImageNext", nextEvent);
		EventEmitter.subscribe("galleryImagePrevious", previousEvent);
		EventEmitter.subscribe("galleryAutoplayStart", startEvent);
		EventEmitter.subscribe("galleryAutoplayStop", stopEvent);

		const { rerender } = render(
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
		expect(nextEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-1",
				autoplay: false,
				eventName: "galleryImageNext",
				orderPosition: 1,
				totalImages: 2,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Previous Slide" }));
		expect(previousEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-1",
				autoplay: false,
				eventName: "galleryImagePrevious",
				orderPosition: 2,
				totalImages: 2,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Start automatic slide show" }));
		expect(startEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-1",
				eventName: "galleryAutoplayStart",
				orderPosition: 1,
				totalImages: 2,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Stop automatic slide show" }));
		expect(stopEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-1",
				eventName: "galleryAutoplayStop",
				orderPosition: 1,
				totalImages: 2,
			})
		);

		nextEvent.mockReset();
		previousEvent.mockReset();
		startEvent.mockReset();
		stopEvent.mockReset();

		rerender(
			<Carousel
				id="Carousel-2"
				label="Carousel Label"
				slidesToShow={2}
				enableAutoplay
				enableFullScreen
			>
				<Carousel.Item label="Slide 1 of 3">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 2 of 3">
					<div />
				</Carousel.Item>
				<Carousel.Item label="Slide 3 of 3">
					<div />
				</Carousel.Item>
			</Carousel>
		);

		await userEvent.click(screen.getByRole("button", { name: "Next Slide" }));
		expect(nextEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-2",
				autoplay: false,
				eventName: "galleryImageNext",
				orderPosition: 1,
				totalImages: 3,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Previous Slide" }));
		expect(previousEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-2",
				autoplay: false,
				eventName: "galleryImagePrevious",
				orderPosition: 2,
				totalImages: 3,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Start automatic slide show" }));
		expect(startEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-2",
				eventName: "galleryAutoplayStart",
				orderPosition: 1,
				totalImages: 3,
			})
		);
		await userEvent.click(screen.getByRole("button", { name: "Stop automatic slide show" }));
		expect(stopEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				ansGalleryHeadline: "Carousel Label",
				ansGalleryId: "Carousel-2",
				eventName: "galleryAutoplayStop",
				orderPosition: 1,
				totalImages: 3,
			})
		);
	});
});
