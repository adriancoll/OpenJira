import { Entry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
  | { type : "[Entry] - ADD"; payload: Entry }
  | { type : "[Entry] - Delete"; payload: string }
  | { type : "[Entry] - Updated"; payload: Entry }
  | { type : "[Entry] - Refresh-data"; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] - ADD":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entry] - Updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id)
            return action.payload;

          return entry;
        }),
      };

    case "[Entry] - Refresh-data":
      return {
        ...state,
        entries: [...action.payload],
      };

    case '[Entry] - Delete':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload )
      };

    default:
      return state;
  }
};
