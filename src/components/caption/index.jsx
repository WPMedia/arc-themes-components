import PropTypes from "prop-types";
import formatCredits from "../../utils/format-credits";

const COMPONENT_CLASS_NAME = "c-caption";

const Caption = ({ caption, className, credit, title }) => {
	const formattedCredit = formatCredits(credit);

	return title || caption || formattedCredit ? (
		<figcaption
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			{title ? (
				<span dangerouslySetInnerHTML={{ __html: `${title} ` }} className="c-caption__title" />
			) : null}
			{caption ? (
				<span dangerouslySetInnerHTML={{ __html: `${caption} ` }} className="c-caption__caption" />
			) : null}
			{formattedCredit ? <span className="c-caption__credit">{formattedCredit}</span> : null}
		</figcaption>
	) : null;
};

Caption.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Title is the first area in the component, if present */
	title: PropTypes.node,
	/** Caption is the second area in the component, if present */
	caption: PropTypes.node,
	/** Credit is the third area in the component, if the object contains by and affiliation */
	credit: PropTypes.object,
};

export default Caption;
