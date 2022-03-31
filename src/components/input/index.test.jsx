import { render, screen, fireEvent } from "@testing-library/react";

import Input from ".";

describe("Input", () => {
	it("should render original and additional classes", () => {
		const ORIGINAL_CLASS = "c-input";
		const ADDITIONAL_CLASS = "additionalClass1";
		const { container } = render(<Input label="label" name="name" className={ADDITIONAL_CLASS} />);
		expect(container.querySelector(`.${ORIGINAL_CLASS}`)).not.toBeNull();
		expect(container.querySelector(`.${ADDITIONAL_CLASS}`)).not.toBeNull();
	});

	it("renders with a label", () => {
		render(<Input name="test" label="label text" />);
		expect(screen.getByText("label text")).toBeInTheDocument();
	});

	it("renders with a tip", () => {
		render(<Input name="test" label="label" tip="tip text" />);
		expect(screen.getByText("tip text")).toBeInTheDocument();
	});

	it("renders with a placeholder", () => {
		render(<Input name="test" label="label" placeholder="Placeholder" />);
		expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
	});

	it("shows an error", () => {
		render(
			<Input
				name="test"
				showDefaultError
				label="input-label"
				validationErrorMessage="There has been an error"
				validationPattern="^valid$"
			/>
		);
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "f" } });
		expect(screen.getByText("There has been an error")).toBeInTheDocument();
	});

	it("shows error after blur and then typing", () => {
		render(<Input name="test" showDefaultError label="input-label" validationPattern="^valid$" />);
		fireEvent.blur(screen.getByRole("textbox"));
		fireEvent.change(screen.getByRole("textbox"), { target: { value: "f" } });
		// shows alert without an error message
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("shows hidden class if hidden true", () => {
		const { container } = render(<Input name="test" label="label" hidden />);
		expect(container.querySelector(".c-input--hidden")).not.toBeNull();
	});

	it("renders autocomplete property", () => {
		render(<Input name="test" label="label" autoComplete="on" />);
		expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "on");
	});

	it("renders default value", () => {
		render(<Input name="test" label="label" defaultValue="default value" />);
		expect(screen.getByRole("textbox")).toHaveValue("default value");
	});

	it("renders required field", () => {
		render(<Input name="test" label="label" required />);
		expect(screen.getByRole("textbox")).toHaveAttribute("required");
	});
});
