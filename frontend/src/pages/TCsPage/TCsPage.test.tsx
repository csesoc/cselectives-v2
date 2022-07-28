import { BrowserRouter } from "react-router-dom";
import { render } from "src/helpers/rtl";
import { it, expect, describe } from "vitest";
import TCsPage from "./TCsPage";

describe("<TCsPage/>", () => {
  it("should render", () => {
    const { getByText } = render(<BrowserRouter><TCsPage /></BrowserRouter>);

    expect(getByText("UNSW Student Code of Conduct")).not.toBeNull();
  });
});
