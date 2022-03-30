/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from "prop-types";
import { Children, cloneElement } from "react";

const Item = ({ children, label, viewable }) => (
	<div
		role="group"
		aria-roledescription="slide"
		tabIndex={viewable ? null : "-1"}
		className="c-carousel__slide"
		aria-label={label}
		aria-hidden={viewable ? null : true}
	>
		{typeof children === "function"
			? children({ viewable })
			: Children.map(children, (child) => cloneElement(child, {
				"aria-hidden": viewable ? null : true,
				tabIndex: !viewable ? "-1" : null,
			}))}
	</div>
);

Item.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/** Accessible label */
	label: PropTypes.string.isRequired,
};

export default Item;
