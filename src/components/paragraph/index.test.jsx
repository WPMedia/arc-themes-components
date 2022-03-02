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
        data-style-truncation-lines="false"
        style={
          Object {
            "WebkitLineClamp": "none",
          }
        }
      >
        Paragraph Text
      </p>
		`);
	});

	it("should not apply truncation by default", () => {
		const { container } = render(<Paragraph>Paragraph Text</Paragraph>);
		expect(
			container.querySelector(".c-paragraph").getAttribute("data-style-truncation-lines")
		).toBe("false");
	});

	it("should apply truncation when specified", () => {
		const { container } = render(<Paragraph truncationLines={3}>Paragraph Text</Paragraph>);
		expect(
			container.querySelector(".c-paragraph").getAttribute("data-style-truncation-lines")
		).toBe("true");
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
