/* eslint-disable react/jsx-no-target-blank */
import PropTypes from "prop-types";

import { withAnchorWrapper, withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-link";

const Link = withComponentClassName(({ children }) => <>{children}</>, {
	componentClassName: COMPONENT_CLASS_NAME,
});

Link.propTypes = {
	/** The text, images or any node that will be displayed within the link */
	children: PropTypes.node.isRequired,
	/** The destination of the link */
	href: PropTypes.string.isRequired,
};

Link.defaultProps = {};

export default withAnchorWrapper(Link);
