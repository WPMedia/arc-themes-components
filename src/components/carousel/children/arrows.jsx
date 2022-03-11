export const NextArrow = (props) => {
	const { className, onClick } = props;
	return (
		<button type="button" title="Next" data-role="none" className={className} onClick={onClick}>
			&#62;
		</button>
	);
};

export const PrevArrow = (props) => {
	const { className, onClick } = props;
	return (
		<button type="button" title="Next" data-role="none" className={className} onClick={onClick}>
			&#60;
		</button>
	);
};
