/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types';

const Link = ({
	additionalClassNames,
	additionalHiddenText,
	assistiveHidden,
	children,
	href,
	openInNewTab,
	openNewTabLinkHiddenText,
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
			{opensInNewTab ? (<span className="visually-hidden">{openNewTabLinkHiddenText}</span>) : null}
			{additionalHiddenText ? (<span className="visually-hidden">{additionalHiddenText}</span>) : null}
		</a>
	);
};

Link.propTypes = {
	additionalClassNames: PropTypes.string,
	additionalHiddenText: PropTypes.string,
	assistiveHidden: PropTypes.bool,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	openInNewTab: PropTypes.bool,
	openNewTabLinkHiddenText: PropTypes.string,
};

Link.defaultProps = {
	additionalClassNames: '',
	additionalHiddenText: '',
	assistiveHidden: false,
	openInNewTab: undefined,
	openNewTabLinkHiddenText: 'Opens in new window',
};

export default Link;
