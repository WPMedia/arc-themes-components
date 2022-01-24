---
inject: true
to: _index.scss
append: true
---

@import './src/components/<%= h.inflection.dasherize(component_name) %>/_index.scss';