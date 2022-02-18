import React from "react";
import renderer from "react-test-renderer";
import Paragraph from ".";

describe("Paragraph", () => {
	it("should render", () => {
		const tree = renderer
			.create(<Paragraph>Paragraph Text</Paragraph>)
			.toJSON();

		expect(tree).toMatchInlineSnapshot(`
<p
  className="c-paragraph"
>
  Paragraph Text
</p>
`);
	});
});
