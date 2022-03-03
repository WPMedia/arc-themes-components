import PropTypes from "prop-types";

const determineVisuallyHiddenText = (supplementalText, opensInNewTab) => {
	if (supplementalText) {
		return supplementalText;
	}
	if (opensInNewTab) {
		return "Opens in new window";
	}
	return "";
};

const withAnchorWrapper = (Component, options = {}) => {
	const AnchorWrappedComponent = (props) => {
		const { className, ...propsWithoutClassName } = props;
		const { assistiveHidden, href, openInNewTab, supplementalText } = props;
		// openInNewTab is undefined by default
		// http or https link or openInNewTab can be either true or undefined for opening in new tab
		const opensInNewTab =
			(href?.startsWith("http") && openInNewTab !== false) || openInNewTab === true;
		const visuallyHiddenText = determineVisuallyHiddenText(supplementalText, opensInNewTab);

		return href ? (
			<a
				className={className}
				href={href}
				aria-hidden={assistiveHidden ? "true" : undefined}
				tabIndex={assistiveHidden ? "-1" : undefined}
				rel={opensInNewTab ? "noreferrer" : undefined}
				target={opensInNewTab ? "_blank" : undefined}
			>
				<Component {...propsWithoutClassName} />
				{visuallyHiddenText ? <span className="visually-hidden">{visuallyHiddenText}</span> : null}
			</a>
		) : (
			<Component {...props} />
		);
	};

	AnchorWrappedComponent.propTypes = {
		/** Remove the link from the accessibility tree with aria-hidden, tabindex=-1 */
		assistiveHidden: PropTypes.bool,
		/** The destination of the link */
		href: PropTypes.string,
		/** Opt to open the link in a new tab */
		openInNewTab: PropTypes.bool,
		/**
		 Text to make the link's purpose more clear to screen readers
		 indicating a new tab in English by default if external link or opting into a new tab
		*/
		supplementalText: PropTypes.string,
		...Component.propTypes,
	};

	AnchorWrappedComponent.defaultProps = {
		assistiveHidden: false,
		openInNewTab: undefined,
		supplementalText: "",
		...Component.defaultProps,
	};

	return AnchorWrappedComponent;
};

export default withAnchorWrapper;
