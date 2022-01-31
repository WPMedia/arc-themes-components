---
inject: true
to: scss.scss
append: true
---
@use './src/components/<%= h.inflection.dasherize(component_name) %>/_index.scss';
