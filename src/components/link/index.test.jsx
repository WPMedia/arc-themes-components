import { render, screen } from '@testing-library/react';

import Link from '.';

const EXTERNAL_LINK_DESTINATION = 'https://www.arcxp.com/';
const INTERNAL_LINK_DESTINATION = '/';
const LINK_TEXT = 'Arc XP';

describe('Link', () => {
	it('should render string child', () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		expect(screen.queryByText(LINK_TEXT)).not.toBeNull();
	});
	it('should render rel property and target blank for external links', () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION} isExternal>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute('rel', 'noreferrer');
		expect(linkOutput).toHaveAttribute('target', '_blank');
	});
	it('should render rel property and target blank for internal links electing to open in new tab', () => {
		render(<Link href={INTERNAL_LINK_DESTINATION} openInNewTab>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute('rel', 'noreferrer');
		expect(linkOutput).toHaveAttribute('target', '_blank');
	});
	it('should not render rel property and target blank by default for internal links', () => {
		render(<Link href={INTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute('rel');
		expect(linkOutput).not.toHaveAttribute('target');
	});
	it('should not render rel property and target blank for external links electing to open in the same tab', () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION} openInNewTab={false}>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute('rel');
		expect(linkOutput).not.toHaveAttribute('target');
	});
	it('should take in additional classnames', () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION} additionalClassNames="test-class">{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveClass('test-class');
	});
});
