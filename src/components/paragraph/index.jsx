import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-paragraph";

const Paragraph = ({ children, className, truncationLines }) => (
	<p
		data-style-truncation-lines={truncationLines > 0 ? "true" : "false"}
		style={{ "--c-paragraph--webkit-line-clamp": truncationLines > 0 ? truncationLines : "none" }}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
	>
		{children}
	</p>
);

Paragraph.defaultProps = {
	className: "",
	truncationLines: 0,
};

Paragraph.propTypes = {
	/** Elements that will be displayed within the component. */
	children: PropTypes.any.isRequired,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Number of lines to show before being truncated and augmented with ellipses.
	 	Default value is `0` and results in no truncation of content.
	 */
	truncationLines: PropTypes.number,
};

export default Paragraph;
