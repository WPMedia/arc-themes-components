import PropTypes from "prop-types";

import { withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-paragraph";

const Paragraph = ({ children, className, truncationLines }) => (
	<p
		style={{ "--paragraph-truncation": truncationLines > 0 ? truncationLines : null }}
		className={className}
	>
		{children}
	</p>
);

Paragraph.defaultProps = {
	truncationLines: 0,
};

Paragraph.propTypes = {
	/** Elements that will be displayed within the component. */
	children: PropTypes.any.isRequired,
	/** Number of lines to show before being truncated and augmented with ellipses.
	 	Default value is `0` and results in no truncation of content.
	 */
	truncationLines: PropTypes.number,
};

export { Paragraph as RawParagraph };

export default withComponentClassName(Paragraph, { componentClassName: COMPONENT_CLASS_NAME });
