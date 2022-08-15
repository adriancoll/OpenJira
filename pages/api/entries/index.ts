import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

export type EntriesDataResponses =
  | { message: string }
  | { message: string, err: any }
  | { entries: IEntry[] }
  | { entry: IEntry }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EntriesDataResponses>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return createEntry(req, res);

    default:
      res.status(400).json({ message: "Ivalid endpoint" });
      break;
  }
}

const getEntries = async (res: NextApiResponse<EntriesDataResponses>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "asc" });

  await db.disconnect();

  return res.status(200).json({ entries });
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<EntriesDataResponses>) => {

  const { description = '' } = req.body
  const entry = new Entry({
    description,
    createdAt: Date.now()
  })
  try {

    await db.connect();
    await entry.save();
    await db.disconnect();

  } catch (err) {
    await db.disconnect();
    return res.status(500).json({ message: 'Entry cannot be created', err })
  }

  return res.status(200).json({ entry });
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<EntriesDataResponses>) => {
  await db.connect();

  const { id } = req.query
  const data = req.body

  try {

    const entry = await Entry.findByIdAndUpdate(id, data, { new: true }) as IEntry
    await db.disconnect();

    return res.status(200).json({ entry })

  } catch (err) {

    await db.disconnect();
    return res.status(500).json({ message: "Error updating the Entry", err })

  }
}