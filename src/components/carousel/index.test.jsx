import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Carousel from ".";

describe("Carousel", () => {
	it("should render", () => {
		const { container } = render(
			<Carousel
				sliderProps={{
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
			</Carousel>
		);
		expect(container.querySelectorAll(".c-carousel")).toHaveLength(1);
	});
	it("should apply custom classes in the class attribute", () => {
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		const { container } = render(
			<Carousel
				className={ADDITIONAL_CLASSES}
				sliderProps={{
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
			</Carousel>
		);
		expect(container.querySelector(".c-carousel").getAttribute("class")).toContain(
			"additionalClass1 additionalClass2"
		);
	});
	it("should only show the number of slides set in slidesToShow", () => {
		const { container } = render(
			<Carousel
				sliderProps={{
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
				<div>Card Four</div>
				<div>Card Five</div>
				<div>Card Six</div>
				<div>Card Seven</div>
				<div>Card Eight</div>
			</Carousel>
		);
		expect(container.querySelectorAll(".slick-active")).toHaveLength(4);
	});
	it("should show slider dots when specified", () => {
		const { container } = render(
			<Carousel
				sliderProps={{
					dots: true,
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
				<div>Card Four</div>
				<div>Card Five</div>
				<div>Card Six</div>
				<div>Card Seven</div>
				<div>Card Eight</div>
			</Carousel>
		);
		expect(container.querySelectorAll(".slick-dots")).toHaveLength(1);
	});
	it("should not show slider dots when not specified", () => {
		const { container } = render(
			<Carousel
				sliderProps={{
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
				<div>Card Four</div>
				<div>Card Five</div>
				<div>Card Six</div>
				<div>Card Seven</div>
				<div>Card Eight</div>
			</Carousel>
		);
		expect(container.querySelectorAll(".slick-dots")).toHaveLength(0);
	});
	it("should not show arrows when specified", () => {
		const { container } = render(
			<Carousel
				sliderProps={{
					arrows: false,
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 0,
				}}
			>
				<div>Card One</div>
				<div>Card Two</div>
				<div>Card Three</div>
				<div>Card Four</div>
				<div>Card Five</div>
				<div>Card Six</div>
				<div>Card Seven</div>
				<div>Card Eight</div>
			</Carousel>
		);
		expect(container.querySelectorAll(".slick-arrow")).toHaveLength(0);
	});
});
