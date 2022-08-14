import { FC, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";
import { entriesApi } from "../../services";

import { EntriesContext, entriesReducer } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntry = (description: string) =>
    dispatch({
      type: "[Entry] - ADD",
      payload: {
        description,
        _id: uuidv4(),
        status: "pending",
        createdAt: Date.now(),
      },
    });

  const updateEntry = (payload: Entry) => {
    dispatch({ type: "[Entry] - Updated", payload });
  };


  const refreshEntries = async () => {
    const { data } = await entriesApi.get('/entries')
    console.log(data)
  }
  
  useEffect(() => {
    refreshEntries()
  }, [])
  

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
