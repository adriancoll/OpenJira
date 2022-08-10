import { FC, useReducer } from "react";

import { UIContext, UIReducer } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider value={{ sidemenuOpen: false }}>
      {children}
    </UIContext.Provider>
  );
};
