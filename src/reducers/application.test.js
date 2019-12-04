import reducer from "reducers/application";
import { fireEvent } from "@testing-library/react/dist";

import { render, cleanup, waitForElement, getByText, getAllByTestId, queryByText, getByAltText, getByPlaceholderText, queryByAltText } from "@testing-library/react";

afterEach(cleanup);

/**
 * Tests the reducer
 */
describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});