import PropTypes from "prop-types";
import { Children, cloneElement } from "react";

const Item = ({ children, label, viewable }) => {
	return (
		<div
			role="group"
			aria-roledescription="slide"
			tabIndex={viewable ? null : "-1"}
			className="c-carousel__slide"
			aria-label={label}
			aria-hidden={viewable ? null : true}
		>
			{Children.map(children, (child) =>
				cloneElement(child, {
					"aria-hidden": viewable ? null : true,
					tabIndex: !viewable ? "-1" : null,
				})
			)}
		</div>
	);
};

Item.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
	/** Accessible label */
	label: PropTypes.string.isRequired,
	/** Is the item viewable? */
	viewable: PropTypes.bool,
};

export default Item;
