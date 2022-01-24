---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.jsx
---
const <%= h.changeCase.pascal(component_name) %> = ({ children }) => {
  return <>{children}</>;
};

export default <%= h.changeCase.pascal(component_name) %>;
