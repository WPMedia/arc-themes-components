import PropTypes from 'prop-types';

const Paragraph = ({ children }) => (
	<p className="c-paragraph">{children}</p>
);

Paragraph.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Paragraph;
