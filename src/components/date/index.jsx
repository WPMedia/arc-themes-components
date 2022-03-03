import PropTypes from "prop-types";

import { withComponentClassName } from "../../common/hocs";

const COMPONENT_CLASS_NAME = "c-date";

const Date = withComponentClassName(
	({ className, dateString, dateTime }) => (
		<time className={className} dateTime={dateTime}>
			{dateString}
		</time>
	),
	{ componentClassName: COMPONENT_CLASS_NAME }
);

Date.propTypes = {
	/** The human-readable text that will be displayed within the component */
	dateString: PropTypes.string.isRequired,
	/**
	 * The date and time of the dateString passed in. This must be a valid machine-readable datetime value
	 * This value should be in an ISO 8601 format.
	 */
	dateTime: PropTypes.string.isRequired,
};

export default Date;
