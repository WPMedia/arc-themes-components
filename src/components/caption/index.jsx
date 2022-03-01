import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-caption";

const Caption = ({ caption, className, credit, title }) =>
	!!(title || caption || credit) && (
		<figcaption
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			{title && <span className="c-caption__title">{title} </span>}
			{caption && <span className="c-caption__caption">{caption} </span>}
			{credit && <span className="c-caption__credit">{credit}</span>}
		</figcaption>
	);

Caption.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Title of the caption */
	title: PropTypes.node,
	/** Caption text */
	caption: PropTypes.node,
	/** Credit text */
	credit: PropTypes.node,
};

export default Caption;
