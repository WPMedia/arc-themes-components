import { render, screen } from '@testing-library/react';

import Link from '.';

const LINK_DESTINATION = 'https://www.arcxp.com/';
const LINK_TEXT = 'Arc XP';

describe('Link', () => {
	it('should render string child', () => {
		render(<Link href={LINK_DESTINATION}>{LINK_TEXT}</Link>);

		expect(screen.queryByText(LINK_TEXT)).not.toBeNull();
	});
	it('should render rel property and target blank for external links', () => {
		render(<Link href={LINK_DESTINATION} isExternal>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute('rel', 'noreferrer');
		expect(linkOutput).toHaveAttribute('target', '_blank');
	});
	it('should not render rel property and target blank by default for internal links', () => {
		render(<Link href={LINK_DESTINATION}>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute('rel');
		expect(linkOutput).not.toHaveAttribute('target');
	});
});
