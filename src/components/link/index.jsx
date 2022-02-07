/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types';

const Link = ({
	additionalClassNames,
	assistiveHidden,
	children,
	href,
	openInNewTab,
	openNewTabLinkVisuallyHiddenText,
	supplementalText,
}) => {
	// openInNewTab is undefined by default
	// http or https link or openInNewTab can be either true or undefined for opening in new tab
	const opensInNewTab = (href.startsWith('http') && openInNewTab !== false) || openInNewTab === true;
	const defaultAndAdditionalClassnames = `c-link${additionalClassNames ? ` ${additionalClassNames}` : ''}`;

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
			{opensInNewTab ? (<span className="visually-hidden">{openNewTabLinkVisuallyHiddenText}</span>) : null}
			{supplementalText ? (<span className="visually-hidden">{supplementalText}</span>) : null}
		</a>
	);
};

Link.propTypes = {
	/** Classnames that get appended to default c-link classname */
	additionalClassNames: PropTypes.string,
	/** Remove the link from the accessibility tree with aria-hidden, tab-index=-1 */
	assistiveHidden: PropTypes.bool,
	/** The text, images or any node that will be displayed within the link */
	children: PropTypes.node.isRequired,
	/** The destination of the link */
	href: PropTypes.string.isRequired,
	/** Opt to open the link in a new tab */
	openInNewTab: PropTypes.bool,
	/** Text to make the link's purpose more clear to screen readers indicating a new tab */
	openNewTabLinkVisuallyHiddenText: PropTypes.string,
	/** Text to make the link's purpose more clear to screen readers */
	supplementalText: PropTypes.string,
};

Link.defaultProps = {
	additionalClassNames: '',
	assistiveHidden: false,
	openInNewTab: undefined,
	openNewTabLinkVisuallyHiddenText: 'Opens in new window',
	supplementalText: '',
};

export default Link;
