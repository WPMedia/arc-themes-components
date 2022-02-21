import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stack from '.';

describe('Stack', () => {
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
			.getAttribute('data-direction'))
			.toBe('vertical');
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
			.getAttribute('data-direction'))
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
			.getAttribute('data-direction'))
			.toBe('horizontal');
	});

	it('should render start alignment by default', () => {
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
			.getAttribute('data-alignment'))
			.toBe('start');
	});

	it('should render start alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="start">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-alignment'))
			.toBe('start');
	});

	it('should render center alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="center">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-alignment'))
			.toBe('center');
	});

	it('should render end alignment when explicitly specified', () => {
		const { container } = render(
			<Stack alignment="end">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('data-alignment'))
			.toBe('end');
	});

	it('should render custom gap when explicitly specified', () => {
		const { container } = render(
			<Stack gap="15px">
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 1" src="https://picsum.photos/200/100" />
				</div>
				<div style={{ height: '100px', width: '200px' }}>
					<img alt="image 2" src="https://loremflickr.com/200/100" />
				</div>
			</Stack>,
		);
		expect(container.querySelector('.c-stack')
			.getAttribute('style'))
			.toBe('--c-stack-gap: 15px;');
	});
});
