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

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

  const toggleSideMenu = () => dispatch({ type: 'UI - Toggle Sidebar' })

  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      toggleSideMenu
    }}>
      {children}
    </UIContext.Provider>
  );

};
