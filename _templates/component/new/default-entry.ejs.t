---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.jsx
---
import PropTypes from 'prop-types';

const COMPONENT_CLASS_NAME = 'c-<%= h.inflection.dasherize(component_name) %>';

const <%= h.changeCase.pascal(component_name) %> = ({ children, additionalClassNames = '' }) => (
	<div className={`${COMPONENT_CLASS_NAME} ${additionalClassNames}`}>
		{children}
	</div>
);

<%= h.changeCase.pascal(component_name) %>.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	additionalClassNames: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default <%= h.changeCase.pascal(component_name) %>;
