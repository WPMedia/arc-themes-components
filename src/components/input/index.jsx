import { useEffect, useState, useRef } from "react";

import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-input";

export const FIELD_TYPES = {
	EMAIL: "email",
	PASSWORD: "password",
	TEXT: "text",
};

const Input = ({
	autoComplete,
	className,
	defaultValue = "",
	hidden = false,
	label,
	name,
	onChange = () => {},
	placeholder,
	required = false,
	showDefaultError = false,
	tip,
	type = FIELD_TYPES.TEXT,
	validationErrorMessage,
	validationPattern,
}) => {
	const [valid, setValid] = useState(true);
	const [value, setValue] = useState(defaultValue);
	const [initialBlur, setInitialBlur] = useState(showDefaultError);
	const inputElement = useRef();

	useEffect(() => {
		if (initialBlur) {
			if (validationErrorMessage) {
				inputElement.current.setCustomValidity("");
			}
			const isValid = inputElement.current?.checkValidity();
			if (!isValid && validationErrorMessage) {
				inputElement.current.setCustomValidity(validationErrorMessage);
			}
			setValid(isValid);
		}
	}, [initialBlur, inputElement, validationErrorMessage, validationPattern, value]);

	const handleBlur = () => {
		setInitialBlur(true);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
		onChange({ value: event.target.value });
	};

	const infoId = `id_${name}_error`;
	const inputId = `id_${name}_input`;

	const fieldParameters = {
		...(autoComplete ? { autoComplete } : {}),
		...(defaultValue !== "" ? { defaultValue } : {}),
		...(validationPattern ? { pattern: validationPattern } : {}),
		...(placeholder ? { placeholder, "aria-placeholder": placeholder } : {}),
		...(required ? { required } : {}),
		...(tip || !valid ? { "aria-describedby": infoId } : {}),
		...(!valid ? { "aria-invalid": true } : {}),
	};

	return (
		<div className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}>
			<label
				className={`${COMPONENT_CLASS_NAME}__label ${
					hidden ? ` ${COMPONENT_CLASS_NAME}--hidden` : ""
				}`}
				htmlFor={inputId}
			>
				{label}
			</label>
			<input
				className={[
					`${COMPONENT_CLASS_NAME}__input`,
					...(hidden ? [`${COMPONENT_CLASS_NAME}-hidden`] : []),
					...(!valid ? [`${COMPONENT_CLASS_NAME}__input--error`] : []),
				].join(" ")}
				id={inputId}
				name={name}
				type={type}
				onBlur={handleBlur}
				onChange={handleChange}
				ref={inputElement}
				{...fieldParameters}
			/>
			{tip || !valid ? (
				<div
					className={[
						`${COMPONENT_CLASS_NAME}__tip`,
						...(!valid ? [`${COMPONENT_CLASS_NAME}__tip--error`] : []),
					].join(" ")}
					id={infoId}
				>
					{!valid && inputElement.current?.validationMessage ? (
						<span role="alert">{`${inputElement.current.validationMessage} `}</span>
					) : null}
					{tip ? <span>{tip}</span> : null}
				</div>
			) : null}
		</div>
	);
};

Input.propTypes = {
	/** Default value for the input */
	defaultValue: PropTypes.string,
	/** Label for the input for indicating to users input's purpose */
	label: PropTypes.string.isRequired,
	/** Name of the input for submitting data */
	name: PropTypes.string.isRequired,
	/** Callback function for when the input's value changes */
	onChange: PropTypes.func,
	/** Placeholder text for the input */
	placeholder: PropTypes.string,
	/** Whether the input is required */
	required: PropTypes.bool,
	/** Whether the input is hidden */
	hidden: PropTypes.bool,
	/** Whether to show the default error message */
	showDefaultError: PropTypes.bool,
	/** Tip for the input. Shown on the page as a hint for users */
	tip: PropTypes.string,
	/** Type of the input based on available types listed */
	type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
	/** The error message shown upon invalid input that doesn't meet `validationPattern` */
	validationErrorMessage: PropTypes.string,
	/** Validation Pattern is a regex pattern for handling errors */
	validationPattern: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component */
	children: PropTypes.node.isRequired,
};

export default Input;
