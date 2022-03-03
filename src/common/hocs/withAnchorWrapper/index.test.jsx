import { render, screen } from "@testing-library/react";

import withAnchorWrapper from ".";

const EXTERNAL_LINK_DESTINATION = "https://www.arcxp.com/";
const INTERNAL_LINK_DESTINATION = "/";
const LINK_TEXT = "Arc XP";

const Component = ({ children }) => children;
const ComponentLink = withAnchorWrapper(Component);

describe("withAnchorWrapper", () => {
	it("should render rel property and target blank for internal links electing to open in new tab", () => {
		render(
			<ComponentLink href={INTERNAL_LINK_DESTINATION} openInNewTab>
				{LINK_TEXT}
			</ComponentLink>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("rel", "noreferrer");
		expect(linkOutput).toHaveAttribute("target", "_blank");
	});
	it("should not render rel property and target blank by default for internal links", () => {
		render(<ComponentLink href={INTERNAL_LINK_DESTINATION}>{LINK_TEXT}</ComponentLink>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("rel");
		expect(linkOutput).not.toHaveAttribute("target");
	});
	it("should not render rel property and target blank for external links electing to open in the same tab", () => {
		render(
			<ComponentLink href={EXTERNAL_LINK_DESTINATION} openInNewTab={false}>
				{LINK_TEXT}
			</ComponentLink>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("rel");
		expect(linkOutput).not.toHaveAttribute("target");
	});
	it("should respond to assistiveHidden and show tab index -1 and aria-hidden", () => {
		render(
			<ComponentLink href={EXTERNAL_LINK_DESTINATION} assistiveHidden>
				{LINK_TEXT}
			</ComponentLink>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("aria-hidden", "true");
		expect(linkOutput).toHaveAttribute("tabIndex", "-1");
	});
	it("should not show assistive hidden properties if false", () => {
		render(
			<ComponentLink href={EXTERNAL_LINK_DESTINATION} assistiveHidden={false}>
				{LINK_TEXT}
			</ComponentLink>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("aria-hidden");
		expect(linkOutput).not.toHaveAttribute("tabIndex");
	});
	it("should render hidden text with visually-hidden class", () => {
		render(
			<ComponentLink href={EXTERNAL_LINK_DESTINATION} supplementalText="RSS ComponentLink">
				{LINK_TEXT}
			</ComponentLink>
		);

		const additionalHiddenText = screen.queryByText("RSS ComponentLink");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});
	it("should render default open new tab text if no supplemental text and new tab", () => {
		render(<ComponentLink href={EXTERNAL_LINK_DESTINATION}>{LINK_TEXT}</ComponentLink>);

		const additionalHiddenText = screen.queryByText("Opens in new window");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});
	it("should render no supplemental text if no supplemental text and same tab", () => {
		render(<ComponentLink href="/">{LINK_TEXT}</ComponentLink>);

		const additionalHiddenText = screen.queryByText("Opens in new window");
		expect(additionalHiddenText).toBeNull();
	});
	it("should render supplemental text regardless of new tab behavior", () => {
		render(
			<ComponentLink
				href={EXTERNAL_LINK_DESTINATION}
				openInNewTab
				supplementalText="RSS ComponentLink"
			>
				{LINK_TEXT}
			</ComponentLink>
		);

		const additionalHiddenText = screen.queryByText("RSS ComponentLink");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});
});
