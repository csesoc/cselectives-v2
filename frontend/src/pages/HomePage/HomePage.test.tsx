import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { render } from "src/helpers/rtl";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  it("should render", () => {
    const { getByText } = render(<BrowserRouter><HomePage /></BrowserRouter>);
    expect(getByText("Login")).not.toBeNull();
  });
});
