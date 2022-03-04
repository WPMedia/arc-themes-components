import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Paragraph from ".";

describe("Paragraph", () => {
	it("should render", () => {
		const tree = renderer.create(<Paragraph>Paragraph Text</Paragraph>).toJSON();

		expect(tree).toMatchInlineSnapshot(`
      <p
        className="c-paragraph"
        style={
          Object {
            "--paragraph-truncation": null,
          }
        }
      >
        Paragraph Text
      </p>
		`);
	});

	it("should not apply truncation by default", () => {
		const { container } = render(<Paragraph>Paragraph Text</Paragraph>);
		expect(container.querySelector(".c-paragraph").getAttribute("style")).toBe(null);
	});

	it("should apply truncation when specified", () => {
		const { container } = render(<Paragraph truncationLines={3}>Paragraph Text</Paragraph>);
		expect(container.querySelector(".c-paragraph").getAttribute("style")).toContain(
			"--paragraph-truncation: 3;"
		);
	});

	it("should apply custom classes in the class attribute", () => {
		const { container } = render(
			<Paragraph className="test-class, test-class-2">Paragraph Text</Paragraph>
		);
		expect(container.querySelector(".c-paragraph").getAttribute("class")).toContain(
			"test-class, test-class-2"
		);
	});
});
