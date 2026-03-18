import express from "express";
import Note from "../models/noteModels.js";

const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error al obtener notas", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// Obtener nota por id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);

        if (!note) return res.status(404).json({ error: "Note Not Found" })

        res.status(200).json(note);
    } catch (error) {
        console.error("Error al obtener nota por id", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// Crear nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = new Note({ title, description });

        const savedNote = await note.save();

        if (savedNote) {
            res.status(201).json({ message: "Note Created Successfully", note: savedNote });
        }
    } catch (error) {
        console.error("Error al crear nota", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// Eliminar nota por id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) return res.status(404).json({ error: "Note Not Found" })

        res.status(200).json({ message: "Note Deleted Successfully", note: deletedNote });
    } catch (error) {
        console.error("Error al eliminar nota", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// Actualizar nota por id
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const updatedNote = await Note.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedNote) return res.status(404).json({ error: "Note Not Found" })

        res.status(200).json({ message: "Note Updated Successfully", note: updatedNote });
    } catch (error) {
        console.error("Error al actualizar nota", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;