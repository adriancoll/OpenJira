import { UIState } from ".";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Toggle Sidebar" };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sidemenuOpen: true,
      };
      break;
    case "UI - Close Sidebar":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "UI - Toggle Sidebar":
      return {
        ...state,
        sidemenuOpen: !state.sidemenuOpen,
      };
    default:
      return state;
  }
};

