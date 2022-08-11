import { UIState } from ".";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Toggle Sidebar" }
  | { type: "UI - Set is adding entry", payload: boolean };

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
      case "UI - Set is adding entry":
        console.log(action.payload)
        return {
          ...state,
          isAddingEntry: action.payload
        }
    default:
      return state;
  }
};
