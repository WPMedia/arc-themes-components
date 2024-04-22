import Join from ".";

const Separator = () => <> • </>;

export default {
	title: "Components/Join",
	component: Join,
};

export const JoinWithMultipleChildren = {
	render: () => (
		<Join separator={Separator}>
			<li>List Item 1</li>
			<li>List Item 2</li>
			<li>List Item 3</li>
		</Join>
	),
};

export const JoinWithOnlyOneItem = {
	render: () => (
		<Join separator={Separator}>
			<li>List Item 1</li>
		</Join>
	),
};
