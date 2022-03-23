import { fireEvent, render } from "@testing-library/react";
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
	it("should ensure custom onReInit is called.", () => {
		const { container } = render(
			<Carousel
				className="testOnReInit"
				sliderProps={{
					arrows: false,
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 3,
					onReInit: () => {
						const parent = document.querySelector(".testOnReInit");
						const div = document.createElement("div");
						div.classList.add("injectedDiv");
						parent.appendChild(div);
					},
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
		expect(container.querySelectorAll(".injectedDiv")).toHaveLength(1);
	});
	it("should ensure custom onReInit is called when pager is used.", () => {
		const { container } = render(
			<Carousel
				className="testOnReInit"
				sliderProps={{
					dots: true,
					arrows: false,
					centerMode: false,
					infinite: false,
					centerPadding: "60px",
					slidesToShow: 4,
					speed: 500,
					slidesToScroll: 1,
					initialSlide: 3,
					onReInit: () => {
						const parent = document.querySelector(".testOnReInit");
						const div = document.createElement("div");
						div.classList.add("injectedDiv");
						parent.appendChild(div);
					},
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
		expect(container.querySelectorAll(".injectedDiv")).toHaveLength(1);
	});

	it("should establish and update correct roles and Aria attributes", () => {
		const { container } = render(
			<Carousel
				className="testOnReInit"
				sliderProps={{
					dots: true,
					arrows: true,
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

		expect(container.querySelector(".slick-slider")).toHaveAttribute("aria-label", "carousel");

		expect(container.querySelector(".slick-slider")).toHaveAttribute("role", "region");

		expect(container.querySelector(".slick-current")).toHaveAttribute("aria-label", "slide 1");

		expect(
			container.querySelector('.slick-slider .slick-dots [aria-current="true"]')
		).toContainHTML('<button aria-current="true">1</button>');

		const button = container.querySelector(".slick-next");
		fireEvent.click(button);

		expect(container.querySelector(".slick-current")).toHaveAttribute("aria-label", "slide 2");

		expect(
			container.querySelector('.slick-slider .slick-dots [aria-current="true"]')
		).toContainHTML('<button aria-current="true">2</button>');
	});
});
