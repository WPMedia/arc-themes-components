import PropTypes from "prop-types";

const withClassNameMerge = (Component, options = {}) => {
	const ClassNameModifiedComponent = (props) => {
		const { className = "" } = props;
		const { componentClassName = "" } = options;

		const mergedClassList = Array.from(
			new Set([...className.split(" "), ...componentClassName.split(" ")])
		)
			.filter((className) => className != "")
			.join(" ");

		return mergedClassList.length ? (
			<Component {...props} className={mergedClassList} />
		) : (
			<Component {...props} />
		);
	};

	ClassNameModifiedComponent.propTypes = {
		/** Class name(s) that get appended to default class name of the component */
		className: PropTypes.string,
		...Component.propTypes,
	};

	ClassNameModifiedComponent.defaultProps = Component.defaultProps;

	return ClassNameModifiedComponent;
};

export default withClassNameMerge;
