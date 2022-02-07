import PropTypes from 'prop-types';

const COMPONENT_CLASS_NAME = 'c-link';

const LinkOpeningInNewTab = ({
	children,
	className,
	href,
	openNewTabLinkHiddenText,
}) => (
	<a
		className={className}
		href={href}
		rel="noreferrer"
		target="_blank"
	>
		{children}
		<span className="visually-hidden">{openNewTabLinkHiddenText}</span>
	</a>
);

const Link = ({
	additionalClassNames,
	children,
	href,
	openInNewTab,
	openNewTabLinkHiddenText,
}) => {
	// openInNewTab is undefined by default
	// http or https link or openInNewTab can be either true or undefined for opening in new tab
	const opensInNewTab = (href.startsWith('http') && openInNewTab !== false) || openInNewTab === true;
	const defaultAndAdditionalClassnames = `${COMPONENT_CLASS_NAME}${additionalClassNames ? ` ${additionalClassNames}` : ''}`;

	if (opensInNewTab) {
		return (
			<LinkOpeningInNewTab
				className={defaultAndAdditionalClassnames}
				href={href}
				openNewTabLinkHiddenText={openNewTabLinkHiddenText}
			>
				{children}
			</LinkOpeningInNewTab>
		);
	}

	return (
		<a
			className={defaultAndAdditionalClassnames}
			href={href}
		>
			{children}
		</a>
	);
};

Link.propTypes = {
	additionalClassNames: PropTypes.string,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	openInNewTab: PropTypes.bool,
	openNewTabLinkHiddenText: PropTypes.string,
};

Link.defaultProps = {
	additionalClassNames: '',
	openInNewTab: undefined,
	openNewTabLinkHiddenText: 'Opens in new window',
};

export default Link;
