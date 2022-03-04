---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.stories.mdx
---
import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs';

import <%= h.changeCase.pascal(component_name) %>, { Raw<%= h.changeCase.pascal(component_name) %> } from '.';

<Meta title="Components/<%= h.changeCase.title( component_name ) %>" component={<%= h.changeCase.pascal(component_name) %>} />

# <%= h.changeCase.pascal(component_name) %>

--- Add a description of the component here ---

## Usage

```
import { <%= h.changeCase.pascal(component_name) %> } from '@wpmedia/arc-themes-components';


<<%= h.changeCase.pascal(component_name) %>>Component Children</<%= h.changeCase.pascal(component_name) %>>
```

## Properties

<ArgsTable of={Raw<%= h.changeCase.pascal(component_name) %>} />

## Stories

** Default **
<Canvas>
	<Story name="Default">
		<<%= h.changeCase.pascal(component_name) %>><%= h.changeCase.pascal(component_name) %> Text</<%= h.changeCase.pascal(component_name) %>>
	</Story>
</Canvas>
