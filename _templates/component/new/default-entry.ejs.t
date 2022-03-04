---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.jsx
---
import PropTypes from 'prop-types';

import { withComponentClassName } from '../../common/hocs';

const COMPONENT_CLASS_NAME = 'c-<%= h.inflection.dasherize(component_name) %>';

const <%= h.changeCase.pascal(component_name) %> = ({ children, className }) => (
	<div className={className}>
		{children}
	</div>
);

<%= h.changeCase.pascal(component_name) %>.propTypes = {
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export { <%= h.changeCase.pascal(component_name) %> as Raw<%= h.changeCase.pascal(component_name) %> };

export default withComponentClassName(
	<%= h.changeCase.pascal(component_name) %>,
	{ componentClassName: COMPONENT_CLASS_NAME },
);
