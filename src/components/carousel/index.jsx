import PropTypes from "prop-types";
// import { useState } from 'react';
import Slider from "react-slick";

const COMPONENT_CLASS_NAME = "c-carousel";

const Carousel = ({ children, className, title }) => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
	};
	return (
		<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
			<link rel="stylesheet" type="text/css" charset="UTF-8" href="index.css" />
			<h2>{title}</h2>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "75%",
				}}
			>
				<Slider {...settings}>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
					<div>
						<h3>
							<img src="http://placekitten.com/g/200/300" alt="meow" />
						</h3>
					</div>
				</Slider>
			</div>
			{children}
		</div>
	);
};

Carousel.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** The title displayed just above the carousel. */
	title: PropTypes.string.isRequired,
};

export default Carousel;
