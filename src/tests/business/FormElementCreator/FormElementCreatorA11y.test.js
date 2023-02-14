import { render } from "@testing-library/react";
import FormElementCreator from "business/FormElementCreator";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("FormElementCreator component", () => {
	it("should be accessible", async () => {
		const { container } = render(<FormElementCreator />);

		expect(await axe(container)).toHaveNoViolations();
	});
});
