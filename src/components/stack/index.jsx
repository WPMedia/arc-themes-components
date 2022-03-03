import React from "react";
import PropTypes from "prop-types";

import { withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-stack";

const Stack = withComponentClassName(
	({ alignment, children, className, direction, divider, inline, justification, gap, wrap }) => {
		const childCount = React.Children.count(children);
		return (
			<div
				className={className}
				data-style-direction={direction}
				data-style-justification={justification}
				data-style-alignment={alignment}
				data-style-inline={inline}
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
	},
	{ componentClassName: COMPONENT_CLASS_NAME }
);

Stack.defaultProps = {
	alignment: "unset",
	direction: "vertical",
	divider: false,
	inline: false,
	justification: "start",
	wrap: "nowrap",
};

Stack.propTypes = {
	/** The alignment of the elements within the component.
	 Relates to CSS Flex's `align-items`
	 Note: When using the divider in a horizontal configuration, alignment should be set to 'unset' */
	alignment: PropTypes.oneOf(["unset", "start", "center", "end"]),
	/** Elements that will be displayed within the component. */
	children: PropTypes.any.isRequired,
	/** The flow of the elements within the component */
	direction: PropTypes.oneOf(["vertical", "horizontal"]),
	/** Display a divider between elements within the component.
	    Note: adding a divider acts as an additional element in the stack
	 	and effectively doubles the gap applied. Dividers are hidden from screen readers.
	 	See alignment property when deciding to use the divider. */
	divider: PropTypes.bool,
	/** The container type. */
	inline: PropTypes.bool,
	/** The justification of the elements within the component.
	    Relates to CSS Flex's `justify-content` */
	justification: PropTypes.oneOf(["start", "center", "end"]),
	/** The gap (or gutter) spacing of the elements within the component
	    Example: `'5px'`,  `'1.5rem'`, etc. */
	gap: PropTypes.string,
	/** Wrapping of the elements within the component */
	wrap: PropTypes.oneOf(["nowrap", "wrap", "reverse"]),
};

export default Stack;
