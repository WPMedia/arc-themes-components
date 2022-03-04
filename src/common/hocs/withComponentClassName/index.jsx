import PropTypes from "prop-types";

const withComponentClassName = (Component, options = {}) => {
	const Composite = (props) => {
		const { className = "" } = props;
		const { componentClassName = "" } = options;

		const mergedClassList = Array.from(
			new Set([...className.split(" "), ...componentClassName.split(" ")])
		)
			.filter((name) => name !== "")
			.join(" ");

		return mergedClassList.length ? (
			<Component {...props} className={mergedClassList} />
		) : (
			<Component {...props} />
		);
	};

	Composite.propTypes = {
		/** Class name(s) that get appended to default class name of the component */
		className: PropTypes.string,
		...Component.propTypes,
	};

	Composite.defaultProps = Component.defaultProps;

	return Composite;
};

export default withComponentClassName;
