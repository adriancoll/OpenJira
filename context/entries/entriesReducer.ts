import { SafetyCheck } from "@mui/icons-material";
import { Entry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType =
  | { type: "[Entry] - ADD", payload: Entry };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case "[Entry] - ADD":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    default:
      return state;
  }
};
