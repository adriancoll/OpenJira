import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | { message: string }
  | { entries: IEntry[] }
  | { entry: IEntry }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('hola')
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return createEntry(req, res);

    // case "PUT":
    //   return updateEntrie(res);

    // case "DELETE":
    //   return deleteEntrie(res);

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

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { description = '' } = req.body

  const entry = await Entry.create({
    description,
  })

  await db.disconnect();

  return res.status(200).json({ entry });
};