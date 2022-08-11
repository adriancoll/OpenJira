import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {  message: string   }
  | {  entries: IEntry[] }
  | {  entry: IEntry }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    default:
      res.status(400).json({ message: "Ivalid endpoint" });
      break;
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "asc" });

  await db.disconnect();

  return res.status(200).json({ entries });
};
