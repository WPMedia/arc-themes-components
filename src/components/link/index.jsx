/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types';

function determineVisuallyHiddenText(supplementalText, opensInNewTab) {
	if (supplementalText) {
		return supplementalText;
	}

	if (opensInNewTab) {
		return 'Opens in new window';
	}

	return '';
}

const Link = ({
	additionalClassNames,
	assistiveHidden,
	children,
	href,
	openInNewTab,
	supplementalText,
}) => {
	// openInNewTab is undefined by default
	// http or https link or openInNewTab can be either true or undefined for opening in new tab
	const opensInNewTab = (href.startsWith('http') && openInNewTab !== false) || openInNewTab === true;
	const defaultAndAdditionalClassnames = `c-link${additionalClassNames ? ` ${additionalClassNames}` : ''}`;

	const visuallyHiddenText = determineVisuallyHiddenText(supplementalText, opensInNewTab);

	return (
		<a
			className={defaultAndAdditionalClassnames}
			href={href}
			aria-hidden={assistiveHidden ? 'true' : undefined}
			tabIndex={assistiveHidden ? '-1' : undefined}
			rel={opensInNewTab ? 'noreferrer' : undefined}
			target={opensInNewTab ? '_blank' : undefined}
		>
			{children}
			{visuallyHiddenText ? (<span className="visually-hidden">{visuallyHiddenText}</span>) : null}
		</a>
	);
};

Link.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	additionalClassNames: PropTypes.string,
	/** Remove the link from the accessibility tree with aria-hidden, tabindex=-1 */
	assistiveHidden: PropTypes.bool,
	/** The text, images or any node that will be displayed within the link */
	children: PropTypes.node.isRequired,
	/** The destination of the link */
	href: PropTypes.string.isRequired,
	/** Opt to open the link in a new tab */
	openInNewTab: PropTypes.bool,
	/**
	 Text to make the link's purpose more clear to screen readers
	 indicating a new tab in English by default if external link or opting into a new tab
	*/
	supplementalText: PropTypes.string,
};

Link.defaultProps = {
	additionalClassNames: '',
	assistiveHidden: false,
	openInNewTab: undefined,
	supplementalText: '',
};

export default Link;
