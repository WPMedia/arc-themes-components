import PropTypes from "prop-types";
import { Children } from "react";
import Source from "./_children/source";
import Image from "../image";

const COMPONENT_CLASS_NAME = "c-picture";
const Picture = ({ children, className, ...rest }) => (
	<picture
		{...rest}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
	>
		{/* TODO: put comment here */}
		{Children.toArray(children).filter((child) => [Image, Source].includes(child.type))}
	</picture>
);

Picture.Source = Source;

Picture.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/* NOTE: Add Children - image component TODO : mention allowed child types */
	children: PropTypes.node.isRequired,
};

export default Picture;
