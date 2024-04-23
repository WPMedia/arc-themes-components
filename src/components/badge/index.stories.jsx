import Badge from ".";

export default {
	title: "Components/Badge",
	component: Badge,
};

export const BadgeVariants = {
	render: () => (
		<>
			<Badge>Default</Badge>
			<Badge variant="light">Light</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
		</>
	),
};

export const DefaultBadge = {
	render: () => <Badge>Badge</Badge>,

	name: "Badge",
};
