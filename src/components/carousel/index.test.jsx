import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Carousel from ".";

describe("Carousel", () => {
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
});
