import {render} from "@testing-library/react";
import {LoginPanel} from "../LoginPanel/LoginPanel";

it('renders the Login panel with correct heading and correct formatted assets', () => {
    const panel = render(<LoginPanel/>);

    expect(panel.getByRole("heading")).toHaveTextContent("login-text");
    expect(panel.getByRole("button")).toHaveTextContent("login-logg-inn");
});
