import { UIState } from ".";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Toggle Sidebar" }
  | { type: "UI - Set is adding entry"; payload: boolean }
  | { type: "UI - Toggle Dragging" }
  | { type: "UI - Start Dragging" }
  | { type: "UI - End Dragging" };

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
      console.log(action.payload);
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "UI - Toggle Dragging":
      return {
        ...state,
        isDragging: !state.isDragging,
      };
    case "UI - Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
