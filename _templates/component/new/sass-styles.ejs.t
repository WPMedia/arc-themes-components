---
to: src/components/<%= h.inflection.dasherize(component_name) %>/_index.scss
---
@use '../../scss';

.c-<%= h.inflection.dasherize(component_name) %> {
	@include scss.component-properties('<%= h.inflection.dasherize(component_name) %>');
}
