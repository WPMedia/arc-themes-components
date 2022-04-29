import { Children } from "react";
import PropTypes from "prop-types";
import List from "./_children/List";
import Sale from "./_children/Sale";

const COMPONENT_CLASS_NAME = "c-price";

const Price = ({ children, className, ...rest }) => {
	const allowedTypes = Object.values(Price).map((subcomponentType) => subcomponentType);
	const subComponents = Children.map(children, (child) =>
		child?.type && allowedTypes?.find((e) => e === child?.type) ? child : null
	);

	return (
		<div
			{...rest}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			data-testid="price"
		>
			{subComponents}
		</div>
	);
};

Price.List = List;
Price.Sale = Sale;

Price.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The text, images or any node that will be displayed within the component - Only Price.List and Price.Sale children items are allowed */
	children: PropTypes.node.isRequired,
};

export default Price;
