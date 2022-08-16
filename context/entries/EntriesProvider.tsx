import { FC, useEffect, useReducer } from "react";

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

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<{ entry: Entry }>("/entries", {
      description,
    });
    return dispatch({
      type: "[Entry] - ADD",
      payload: data.entry,
    });
  };

  const updateEntry = async (payload: Entry) => {
    console.log("Updating entry", payload);
    const {
      data: { entry },
    } = await entriesApi.put<{ entry: Entry }>(
      `/entries/${payload._id}`,
      payload
    );
    dispatch({ type: "[Entry] - Updated", payload: { ...entry } });
  };

  const deleteEntry = (id: string) => {
    const response = entriesApi.delete(`/entries/${id}`);
    dispatch({
      type: '[Entry] - Delete',
      payload: id
    })
  };

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<{ entries: Entry[] }>("/entries");
      dispatch({
        type: "[Entry] - Refresh-data",
        payload: data.entries,
      });
    } catch (err) {
      console.error("error fetching entries", err);
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{ ...state, addEntry, updateEntry, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
