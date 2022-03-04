import PropTypes from "prop-types";
import { sanitize } from "dompurify";

const COMPONENT_CLASS_NAME = "c-caption";

const Caption = ({ caption, className, credit, title }) =>
	title || caption || credit ? (
		<figcaption
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		>
			{title ? (
				<span dangerouslySetInnerHTML={{ __html: sanitize(title) }} className="c-caption__title" />
			) : null}
			{caption ? (
				<span
					dangerouslySetInnerHTML={{ __html: sanitize(caption) }}
					className="c-caption__caption"
				/>
			) : null}
			{credit ? (
				<span
					dangerouslySetInnerHTML={{ __html: sanitize(credit) }}
					className="c-caption__credit"
				/>
			) : null}
		</figcaption>
	) : null;

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
