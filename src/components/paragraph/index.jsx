import PropTypes from "prop-types";

import { withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-paragraph";

const Paragraph = withComponentClassName(
	({ children, className }) => <p className={className}>{children}</p>,
	{ componentClassName: COMPONENT_CLASS_NAME }
);

Paragraph.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Paragraph;
