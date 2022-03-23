import PropTypes from "prop-types";
import Slider from "react-slick";
import { useEffect, useRef } from "react";

const COMPONENT_CLASS_NAME = "c-carousel";

const Carousel = ({ children, className, sliderProps }) => {
	const sliderRef = useRef();
	const { onReInit: sliderReInit } = sliderProps;

	/**
	 * This useEffect will enhance a11y:
	 * 1) It will add role and aria-label to the carousel component
	 * 2) It will add needed roles and labels to each slide.
	 * 3) If paging is being used it will set the current pager container to aria-current=true
	 */
	useEffect(() => {
		const slider = sliderRef.current.querySelector(".slick-slider");
		slider?.setAttribute("role", "region");
		slider?.setAttribute("aria-label", "carousel");

		const slides = slider?.querySelectorAll(".slick-slide");
		slides?.forEach((slide) => {
			slide.setAttribute("role", "group");
			slide.setAttribute("aria-label", `slide ${parseInt(slide.dataset.index, 10) + 1}`);
		});

		const pager = slider?.querySelector(".slick-dots .slick-active > *");
		if (pager) pager.setAttribute("aria-current", "true");
	}, []);

	/**
	 * The onReInit is a callback of the react-slider.
	 * It is being used to update the aria-current attribute on the pager if its being used.
	 * It also checked to see if the caller passed in their own onReInit and if so executes it.
	 */
	const onReInit = () => {
		const currentActive = sliderRef.current.querySelector(
			'.slick-slider .slick-dots [aria-current="true"]'
		);
		const pager = sliderRef.current.querySelector(".slick-slider .slick-dots .slick-active > *");
		if (currentActive && pager) {
			currentActive.removeAttribute("aria-current");
			pager.setAttribute("aria-current", "true");
		}

		if (sliderReInit) sliderReInit();
	};

	return (
		<div
			ref={sliderRef}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			<Slider onReInit={onReInit} {...sliderProps}>
				{children}
			</Slider>
		</div>
	);
};
Carousel.propTypes = {
	/** The text, images or any node that will be displayed within the component. */
	children: PropTypes.node.isRequired,
	/** Class name(s) that get appended to default class name of the component. */
	className: PropTypes.string,
	/** Settings object for the internal React Slick Slider */
	sliderProps: PropTypes.shape({}),
};

export default Carousel;
