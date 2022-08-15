import { RestartAlt } from "@mui/icons-material";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { EntriesDataResponses } from ".";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(500).json({
            message: 'The id provided is not a MongoID!'
        })
    }

    switch (req.method) {

        case 'GET':
            getEntry(req,res)
            break;

        case 'PUT':
            updateEntry(req, res)
            break;

        default:
            res.status(400).json({ message: `Method ${req.method} doesn't exists.` });
            break;
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<EntriesDataResponses>) => {

    const { id } = req.query

    await db.connect();

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        return res.status(500).json({ message: `Entry with ID '${id}' doesn't exists.` })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body


    try {

        const entry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true }) as IEntry
        await db.disconnect();
        return res.status(200).json({ entry })

    } catch (err: any) {
        await db.disconnect();
        return res.status(400).json({ message: err.errors.status.message })
    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<EntriesDataResponses>) => {
    const { id } = req.query

    await db.connect()

    const entry = await Entry.findById(id)
    
    await db.disconnect()

    if (!entry) return res.status(400).json({ message: `Entry with ID ${id} not found.` })

    return res.status(200).json({ entry })
}