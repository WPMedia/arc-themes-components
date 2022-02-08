---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.stories.mdx
---
import { Meta, Story, Preview, Props } from '@storybook/addon-docs';

import <%= h.changeCase.pascal(component_name) %> from '.';

<Meta title="Components/<%= h.changeCase.title( component_name ) %>" component={<%= h.changeCase.pascal(component_name) %>} />

# <%= h.changeCase.pascal(component_name) %>

--- Add a description of the component here ---

## Usage

```
import { <%= h.changeCase.pascal(component_name) %> } from '@wpmedia/arc-themes-components';


<<%= h.changeCase.pascal(component_name) %>>Component Children</<%= h.changeCase.pascal(component_name) %>>
```

## Properties

<Props of={<%= h.changeCase.pascal(component_name) %>} />

## Stories

** Default **
<Preview>
	<Story name="Default">
		<<%= h.changeCase.pascal(component_name) %>><%= h.changeCase.pascal(component_name) %> Text</<%= h.changeCase.pascal(component_name) %>>
	</Story>
</Preview>
