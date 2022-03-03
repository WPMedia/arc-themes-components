import { render, screen } from "@testing-library/react";

import withComponentClassName from ".";

const COMPONENT_CLASS = "originalClass";

const Component = ({ children, className }) => <div className={className}>{children}</div>;
const ComponentMerged = withComponentClassName(Component, { componentClassName: COMPONENT_CLASS });
const ComponentMergedNoClass = withComponentClassName(Component);

describe("withComponentClassName", () => {
	it("should render additional classes", () => {
		const ADDITIONAL_CLASSES = "additionalClass1 additionalClass2";
		render(<ComponentMerged className={ADDITIONAL_CLASSES}>Hello World</ComponentMerged>);
		const element = screen.queryByText("Hello World");
		expect(element).toHaveClass(ADDITIONAL_CLASSES);
		expect(element).toHaveClass(COMPONENT_CLASS);
	});
	it("should render no classes if none provided", () => {
		render(<ComponentMergedNoClass>Hello World</ComponentMergedNoClass>);
		const element = screen.queryByText("Hello World");
		expect(element).not.toHaveAttribute("class");
	});
});
