import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-date";

const Date = ({ children, className }) => (
	<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
		{children}
	</div>
);

Date.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Date;
