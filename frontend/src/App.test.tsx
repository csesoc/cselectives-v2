import { render } from "./helpers/rtl";
import { it, expect } from "vitest";
import App from "./App";

it("should render Home", () => {
  const { queryByText } = render(<App />);
  expect(queryByText("Login")).not.toBeNull();
});
