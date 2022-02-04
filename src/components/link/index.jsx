import PropTypes from 'prop-types';

const COMPONENT_CLASS_NAME = 'c-link';

const ExternalLink = ({ children, href }) => (
	<a
		className={COMPONENT_CLASS_NAME}
		href={href}
		rel="noreferrer"
		target="_blank"
	>
		<span className="visually-hidden">Opens in new window</span>
		{children}
	</a>
);

const Link = ({ children, href, isExternal }) => {
	// internal link by default
	if (isExternal) {
		return (
			<ExternalLink href={href}>
				{children}
			</ExternalLink>
		);
	}

	return (
		<a
			className={COMPONENT_CLASS_NAME}
			href={href}
		>
			{children}
		</a>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	isExternal: PropTypes.bool,
};

Link.defaultProps = {
	isExternal: false,
};

export default Link;
