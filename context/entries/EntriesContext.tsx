import { createContext } from "react";

import { Entry } from "../../interfaces";

export interface EntriesContextProps {
  entries: Entry[];
  //methiods
  addEntry: (description: string) => void;
  updateEntry: (payload: Entry, showSnackbar?: boolean) => void;
  deleteEntry: (id: string) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);
