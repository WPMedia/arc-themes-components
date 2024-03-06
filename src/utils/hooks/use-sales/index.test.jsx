import { render } from "@testing-library/react";
import SalesObject from "@arc-publishing/sdk-sales";
import useSales from ".";

jest.mock("@arc-publishing/sdk-identity", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("@arc-publishing/sdk-sales", () => ({
	__esModule: true,
	default: {
		apiOrigin: "",
		options: jest.fn(),
	},
}));

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		// arcSite
		api: {
			identity: {
				origin: "http://origin/",
			},
		},
	})),
);

jest.mock("fusion:context", () => ({
	__esModule: true,
	useFusionContext: () => ({
		arcSite: "Test Site",
	}),
}));

describe("Sales useSales Hook", () => {

	it("initializes and returns Sales object", () => {
		const testInitialization = jest.fn();

		const Test = () => {
			const { isInitialized, Sales } = useSales();
			testInitialization(isInitialized);
      expect(Sales).toBe(SalesObject);
			return <div />;
		};

		render(<Test />);

		expect(testInitialization).toHaveBeenCalledWith(false);
		expect(testInitialization).toHaveBeenLastCalledWith(true);
	});
});
