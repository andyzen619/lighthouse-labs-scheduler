import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";
import { exportAllDeclaration } from "@babel/types";

afterEach(cleanup);

it("defaults to Monday and changes schedule when a ndw ay is selected", () => {
  const { getByText } = render(<Application/>);

  return waitForElement(()=> getByText("Monday")).then(()=> {
    fireEvent.click(getByText("Tuesday"));
    exportAllDeclaration(getByText("Leopold Silbers")).toBeInTheDocument();
  });
});
