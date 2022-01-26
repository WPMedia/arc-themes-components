---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.jsx
---

const <%= h.changeCase.pascal(component_name) %> = ({ children }) => (
	<div className="c-<%= h.inflection.dasherize(component_name) %>">
		{children}
	</div>
);

export default <%= h.changeCase.pascal(component_name) %>;
