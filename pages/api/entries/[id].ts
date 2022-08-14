import { NextApiRequest, NextApiResponse } from "next";
import { EntriesDataResponses } from ".";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            updateEntry(req, res)
            break;
        // case 'DELETE':

        //     break;

        default:
            res.status(400).json({ message: "Ivalid endpoint" });
            break;
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<EntriesDataResponses>) => {

    const { id } = req.query
    const data = req.body

    try {
        await db.connect();

        const entry = await Entry.findByIdAndUpdate(id, data, { new: true }) as IEntry

        await db.disconnect();

        return res.status(200).json({ entry })

    } catch (err) {

        await db.disconnect();
        return res.status(500).json({ message: "Error updating the Entry", err })

    }
}
