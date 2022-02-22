import React from 'react';
import PropTypes from 'prop-types';

const Stack = ({
	additionalClassNames,
	children,
	direction,
	alignment,
	gap,
	wrap,
}) => {
	const defaultAndAdditionalClassnames = `c-stack${additionalClassNames ? ` ${additionalClassNames}` : ''}`;
	return (
		<div
			className={defaultAndAdditionalClassnames}
			data-style-direction={direction}
			data-style-alignment={alignment}
			data-style-wrap={wrap}
			style={{ '--c-stack-gap': gap }}
		>
			{children}
		</div>
	);
};

Stack.defaultProps = {
	additionalClassNames: '',
	direction: 'vertical',
	alignment: 'start',
	wrap: 'nowrap',
};

Stack.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	additionalClassNames: PropTypes.string,
	/** Elements that will be displayed within the component */
	children: PropTypes.any.isRequired,
	/** The flow of the elements within the component */
	direction: PropTypes.oneOf(['vertical', 'horizontal']),
	/** The alignment of the elements within the component */
	alignment: PropTypes.oneOf(['start', 'center', 'end']),
	/** The gap (or gutter) spacing of the elements within the component */
	gap: PropTypes.string,
	/** Wrapping of the elements within the component */
	wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
};

export default Stack;
