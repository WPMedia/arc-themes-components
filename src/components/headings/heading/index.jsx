import PropTypes from 'prop-types';
import LevelContext from '../context';

const COMPONENT_CLASS_NAME = 'c-heading';

const Heading = ({ additionalClassNames = '', children }) => (
	<LevelContext.Consumer>
		{(level) => {
			const allClasses = `${COMPONENT_CLASS_NAME}${additionalClassNames ? ` ${additionalClassNames}` : ''}`;
			// max heading level is 6
			const HeadingTag = `h${Math.min(level, 6)}`;

			return <HeadingTag className={allClasses}>{children}</HeadingTag>;
		}}
	</LevelContext.Consumer>
);

Heading.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	additionalClassNames: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Heading;