import { FC, useReducer } from "react";

import { UIContext, UIReducer } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  // sidebar
  const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });

  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });

  const toggleSideMenu = () => dispatch({ type: "UI - Toggle Sidebar" });

  // entry ui effect
  const setIsAddingEntry = (payload: boolean) => dispatch({ type: "UI - Set is adding entry", payload });
  
  const toggleDragging = () => dispatch({ type: "UI - Toggle Dragging" });

  const startDragging = () => dispatch({ type: "UI - Start Dragging" });

  const endDragging = () => dispatch({ type: "UI - End Dragging" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        toggleSideMenu,
        setIsAddingEntry,
        toggleDragging,
        startDragging,
        endDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
