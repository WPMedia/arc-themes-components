---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.test.jsx
---
import { render, screen } from '@testing-library/react';

import <%= h.changeCase.pascal(component_name) %> from './';

describe('<%= h.changeCase.title( component_name ) %>', () => {
  it('should render string child', () => {
    render(<<%= h.changeCase.pascal(component_name) %>>Hello World</<%= h.changeCase.pascal(component_name) %>>);
    expect(screen.queryByText('Hello World')).not.toBeNull();
  });
});
