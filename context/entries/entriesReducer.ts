import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
  | { type: "Entries - ADD" };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case "Entries - ADD":
      return {
        ...state,
        entries: [],
      };
      break; 
    default:
      return state;
  }
};
