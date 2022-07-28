import {
  userSlice,
  initialState as userState,
} from "src/logic/redux/reducers/userSlice/userSlice";
import {
  courseSlice,
  initialState as courseState,
} from "src/logic/redux/reducers/courseSlice/courseSlice";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactNode } from "react";

const preloadedInitialState = {
  user: userState,
  course: courseState,
};

const render = (
  ui: JSX.Element,
  state?: any,
  {
    store = configureStore({
      reducer: {
        user: userSlice.reducer,
        course: courseSlice.reducer,
      },
      preloadedState: state || preloadedInitialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override methods
export { render, preloadedInitialState };
