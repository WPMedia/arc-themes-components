import React from 'react';
import PropTypes from 'prop-types';

const Stack = ({
	children, direction, alignment, gap,
}) => (
	<div
		className="c-stack"
		data-direction={direction}
		data-alignment={alignment}
		style={{ '--c-stack-gap': gap }}
	>
		{children}
	</div>
);

Stack.defaultProps = {
	direction: 'vertical',
	alignment: 'start',
};

Stack.propTypes = {
	children: PropTypes.any.isRequired,
	direction: PropTypes.oneOf(['vertical', 'horizontal']),
	alignment: PropTypes.oneOf(['start', 'center', 'end']),
	gap: PropTypes.string,
};

export default Stack;
