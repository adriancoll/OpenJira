import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";

import { EntriesContext, entriesReducer } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "1- Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "2- Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description:
        "3- Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim illum maxime eaque error laboriosam, doloremque deserunt totam facere odit quisquam accusamus assumenda atque ex modi minus vel, rerum repudiandae!",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
