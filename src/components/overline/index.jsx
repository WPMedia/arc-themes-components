import PropTypes from "prop-types";

import { withAnchorWrapper, withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-overline";

const Overline = ({ children, className }) => <span className={className}>{children}</span>;

Overline.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

Overline.defaultProps = {};

export { Overline as RawOverline };

export default withComponentClassName(withAnchorWrapper(Overline), {
	componentClassName: COMPONENT_CLASS_NAME,
});
