import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

//Tests for Application
describe("Application", () => {
  it("defaults to Monday and changes schedule when a new ay is selected", async () => {
    const { getByText } = render(<Application/>);
  
    await waitForElement(()=> getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const {container} = render(<Application/>);
    await waitForElement(()=> getByText(container, "Archie Cohen"))
    console.log(prettyDOM(container));

    const appointment = getAllByTestId(container, "appointment")[0];
    console.log(prettyDOM(appointment));
    
  });
});
