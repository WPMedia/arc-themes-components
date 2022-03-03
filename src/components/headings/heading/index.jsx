import PropTypes from "prop-types";
import LevelContext from "../context";

import { withComponentClassName } from "../../../common/hocs";

const COMPONENT_CLASS_NAME = "c-heading";

const HeadingOutput = withComponentClassName(
	({ children, className, level }) => {
		// max heading level is 6
		const HeadingTag = `h${Math.min(level, 6)}`;
		return <HeadingTag className={className}>{children}</HeadingTag>;
	},
	{ componentClassName: COMPONENT_CLASS_NAME }
);

const Heading = ({ children, className }) => (
	<LevelContext.Consumer>
		{(level) => (
			<HeadingOutput className={className} level={level}>
				{children}
			</HeadingOutput>
		)}
	</LevelContext.Consumer>
);

Heading.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Heading;
