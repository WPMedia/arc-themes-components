import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-separator";

const Separator = ({ className, separatorString }) => {
	const isCustomSeparator = separatorString !== "";
	const classNames = [
		COMPONENT_CLASS_NAME,
		isCustomSeparator ? "c-separator--custom-string" : "",
		className,
	]
		.filter((classString) => classString)
		.join(" ");

	if (isCustomSeparator) {
		return (
			<span
				className={classNames}
				// passes in the separator string to show as the content property using attr()
				data-separator-string={separatorString}
			/>
		);
	}

	return <span className={classNames} />;
};

Separator.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Custom separator string */
	separatorString: PropTypes.string,
};

Separator.defaultProps = {
	separatorString: "",
};

export default Separator;
