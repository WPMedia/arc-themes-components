import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stack from '.';

describe('Stack', () => {
	it('should render only one child div', () => {
		const { container } = render(
			<Stack>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelectorAll('.c-stack div'))
			.toHaveLength(1);
	});

	it('should render only one child div with divider', () => {
		const { container } = render(
			<Stack divider>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelectorAll('.c-stack div'))
			.toHaveLength(1);

		expect(container.querySelectorAll('.c-stack hr'))
			.toHaveLength(1);
	});

	it('should render only two child divs', () => {
		const { container } = render(
			<Stack>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelectorAll('.c-stack div'))
			.toHaveLength(2);
	});

	it('should render vertical layout by default', () => {
		const { container } = render(
			<Stack>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-direction'))
			.toBe('vertical');
	});

	it('should apply custom classes in the class attribute', () => {
		const { container } = render(
			<Stack additionalClassNames="test-class">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('class'))
			.toContain('test-class');
	});

	it('should render vertical layout when explicitly specified', () => {
		const { container } = render(
			<Stack direction="vertical">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-direction'))
			.toBe('vertical');
	});

	it('should render horizontal layout when explicitly specified', () => {
		const { container } = render(
			<Stack direction="horizontal">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-direction'))
			.toBe('horizontal');
	});

	it('should render wrap=nowrap when by default', () => {
		const { container } = render(
			<Stack direction="horizontal">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);

		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-wrap'))
			.toBe('nowrap');
	});

	it('should render  wrap=wrap when by specified', () => {
		const { container } = render(
			<Stack direction="horizontal" wrap="wrap">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);

		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-wrap'))
			.toBe('wrap');
	});

	it('should render  wrap=wrap-reverse when by specified', () => {
		const { container } = render(
			<Stack direction="horizontal" wrap="wrap-reverse">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);

		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-wrap'))
			.toBe('wrap-reverse');
	});

	it('should render unset alignment by default', () => {
		const { container } = render(
			<Stack>
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-alignment'))
			.toBe('unset');
	});

	it('should render start alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="start">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-alignment'))
			.toBe('start');
	});

	it('should render center alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="center">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-alignment'))
			.toBe('center');
	});

	it('should render end alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="end">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-alignment'))
			.toBe('end');
	});

	it('should render start justification when explicitly specified', () => {
		const { container } = render(
			<Stack justification="start">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-justification'))
			.toBe('start');
	});

	it('should render center justification when explicitly specified', () => {
		const { container } = render(
			<Stack justification="center">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-justification'))
			.toBe('center');
	});

	it('should render end justification when explicitly specified', () => {
		const { container } = render(
			<Stack justification="end">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-justification'))
			.toBe('end');
	});

	it('should render custom gap when explicitly specified', () => {
		const { container } = render(
			<Stack gap="15px">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('style'))
			.toBe('--c-stack-gap: 15px;');
	});

	it('should not render dividers when not specified', () => {
		const { container } = render(
			<Stack>
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelectorAll('.c-stack hr'))
			.toHaveLength(0);
	});

	it('should render dividers when explicitly specified', () => {
		const { container } = render(
			<Stack divider>
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelectorAll('.c-stack hr'))
			.toHaveLength(2);
	});

	it('should render a flex flextype by default', () => {
		const { container } = render(
			<Stack>
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-flextype'))
			.toBe('flex');
	});

	it('should render a inline-flex flextype when specified', () => {
		const { container } = render(
			<Stack flexType="inline-flex">
				<div key="1" style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div key="2" style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-style-flextype'))
			.toBe('inline-flex');
	});
});
