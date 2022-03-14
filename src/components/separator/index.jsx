import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-separator";

const Separator = ({ className, separatorString }) => {
	const isCustomSeparator = separatorString !== "";
	const classNames = [COMPONENT_CLASS_NAME, className]
		.filter((classString) => classString)
		.join(" ");

	return (
		<span
			className={classNames}
			style={{
				// ensuring emoji within are rendered as strings so that they count as tokens
				// fallback of null so that variable content is not set at all
				"--content": isCustomSeparator ? `"${separatorString}"` : null,
			}}
		/>
	);
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
