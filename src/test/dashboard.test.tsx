import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { screen, cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "@/pages/home";

describe("Home Page", () => {
	afterEach(() => {
		cleanup();
	});

	it("should displays home", async () => {
		render(
			<Router>
				<Home />
			</Router>
		);

		const home = screen.getByText(/Home/i);
		expect(home).toBeInTheDocument();
	});
});
