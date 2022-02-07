---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.jsx
---
import PropTypes from 'prop-types';

const COMPONENT_CLASS_NAME = 'c-<%= h.inflection.dasherize(component_name) %>';

const <%= h.changeCase.pascal(component_name) %> = ({ children, className = '' }) => (
	<div className={`${COMPONENT_CLASS_NAME} ${className}`}>
		{children}
	</div>
);

<%= h.changeCase.pascal(component_name) %>.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default <%= h.changeCase.pascal(component_name) %>;
