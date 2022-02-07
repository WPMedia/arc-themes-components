import PropTypes from 'prop-types';

const COMPONENT_CLASS_NAME = 'c-link';

const LinkOpeningInNewTab = ({
	assistiveHidden,
	children,
	className,
	href,
	openNewTabLinkHiddenText,
	title,
}) => (
	<a
		aria-hidden={assistiveHidden ? 'true' : undefined}
		tabIndex={assistiveHidden ? '-1' : undefined}
		className={className}
		href={href}
		rel="noreferrer"
		target="_blank"
		title={title || undefined}
	>
		{children}
		<span className="visually-hidden">{openNewTabLinkHiddenText}</span>
	</a>
);

const Link = ({
	additionalClassNames,
	assistiveHidden,
	children,
	href,
	openInNewTab,
	openNewTabLinkHiddenText,
	title,
}) => {
	// openInNewTab is undefined by default
	// http or https link or openInNewTab can be either true or undefined for opening in new tab
	const opensInNewTab = (href.startsWith('http') && openInNewTab !== false) || openInNewTab === true;
	const defaultAndAdditionalClassnames = `${COMPONENT_CLASS_NAME}${additionalClassNames ? ` ${additionalClassNames}` : ''}`;

	if (opensInNewTab) {
		return (
			<LinkOpeningInNewTab
				assistiveHidden={assistiveHidden}
				className={defaultAndAdditionalClassnames}
				href={href}
				openNewTabLinkHiddenText={openNewTabLinkHiddenText}
				title={title}
			>
				{children}
			</LinkOpeningInNewTab>
		);
	}

	return (
		<a
			aria-hidden={assistiveHidden ? 'true' : undefined}
			className={defaultAndAdditionalClassnames}
			href={href}
			tabIndex={assistiveHidden ? '-1' : undefined}
			title={title || undefined}
		>
			{children}
		</a>
	);
};

Link.propTypes = {
	additionalClassNames: PropTypes.string,
	assistiveHidden: PropTypes.bool,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	openInNewTab: PropTypes.bool,
	openNewTabLinkHiddenText: PropTypes.string,
	title: PropTypes.string,
};

Link.defaultProps = {
	additionalClassNames: '',
	assistiveHidden: false,
	openInNewTab: undefined,
	openNewTabLinkHiddenText: 'Opens in new window',
	title: undefined,
};

export default Link;
