---
to: src/components/<%= h.inflection.dasherize(component_name) %>/index.test.jsx
---
import { render, screen } from '@testing-library/react';

import <%= h.changeCase.pascal(component_name) %> from '.';

describe('<%= h.changeCase.title( component_name ) %>', () => {
	it('should render string child', () => {
		render(<<%= h.changeCase.pascal(component_name) %>>Hello World</<%= h.changeCase.pascal(component_name) %>>);
		expect(screen.queryByText('Hello World')).not.toBeNull();
	});

	it('should render additional classes', () => {
		const ORIGINAL_CLASSES = 'c-<%= h.inflection.dasherize(component_name) %>';
		const ADDITIONAL_CLASSES = 'additionalClass1 additionalClass2';
		render(<<%= h.changeCase.pascal(component_name) %> className={ADDITIONAL_CLASSES}>Hello World</<%= h.changeCase.pascal(component_name) %>>);
		const element = screen.queryByText('Hello World');
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(ORIGINAL_CLASSES);
	});
});
