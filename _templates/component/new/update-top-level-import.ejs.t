---
inject: true
to: index.js
before: export
---
import <%= h.changeCase.pascal(component_name) %> from './src/components/<%= h.inflection.dasherize(component_name) %>';