import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-separator";

const Separator = ({ className, separatorString }) => (
	<span
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		// passes in the separator string to show as the content property using attr()
		data-separator-string={separatorString}
	/>
);

Separator.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Custom separator string */
	separatorString: PropTypes.string,
};

Separator.defaultProps = {
	separatorString: "●",
};

export default Separator;
