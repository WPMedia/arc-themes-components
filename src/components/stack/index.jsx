import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Stack = ({
	additionalClassNames,
	alignment,
	children,
	direction,
	divider,
	flexType,
	justification,
	gap,
	wrap,
}) => {
	const defaultAndAdditionalClassnames = `c-stack${
		additionalClassNames ? ` ${additionalClassNames}` : ""
	}`;
	const childCount = React.Children.count(children);
	return (
		<div
			className={defaultAndAdditionalClassnames}
			data-style-direction={direction}
			data-style-justification={justification}
			data-style-alignment={alignment}
			data-style-flextype={flexType}
			data-style-wrap={wrap}
			style={{ "--c-stack-gap": gap }}
		>
			{React.Children.map(children, (child, index) => (
				<>
					{child}
					{divider && index !== childCount - 1 ? <hr aria-hidden="true" /> : null}
				</>
			))}
		</div>
	);
};

Stack.defaultProps = {
	additionalClassNames: "",
	alignment: "unset",
	direction: "vertical",
	divider: false,
	flexType: "flex",
	justification: "start",
	wrap: "nowrap",
};

Stack.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	additionalClassNames: PropTypes.string,
	/** The alignment of the elements within the component.
	 Relates to CSS Flex's `align-items`
	 Note: When using the divider in a horizontal configuration, alignment should be set to 'unset' */
	alignment: PropTypes.oneOf(["unset", "start", "center", "end"]),
	/** Elements that will be displayed within the component. It is recommended that
	 	each child element have a unique React key attribute */
	children: PropTypes.any.isRequired,
	/** The flow of the elements within the component */
	direction: PropTypes.oneOf(["vertical", "horizontal"]),
	/** Display a divider between elements within the component.
	    Note: adding a divider acts as an additional element in the stack
	 	and effectively doubles the gap applied. Dividers are hidden from screen readers.
	 	See alignment property when deciding to use the divider. */
	divider: PropTypes.bool,
	/** The flex container type */
	flexType: PropTypes.oneOf(["flex", "inline-flex"]),
	/** The justification of the elements within the component.
	    Relates to CSS Flex's `justify-content` */
	justification: PropTypes.oneOf(["start", "center", "end"]),
	/** The gap (or gutter) spacing of the elements within the component
	    Example: `'5px'`,  `'1.5rem'`, etc. */
	gap: PropTypes.string,
	/** Wrapping of the elements within the component */
	wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
};

export default Stack;
