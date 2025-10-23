---
inject: true
to: index.js
after: // inject imports after this comment and alphabetize them 
---
import <%= h.changeCase.pascal(component_name) %> from './src/components/<%= h.inflection.dasherize(component_name) %>';