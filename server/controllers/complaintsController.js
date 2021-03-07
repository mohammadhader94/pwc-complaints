import express from 'express';
import mongoose from 'mongoose';

import Complaint from '../models/Complaint.js';

export const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();

        res.status(200).json(complaints);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getComplaintsByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const complaints = await Complaint.find({creator: id});

        res.status(200).json(complaints);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createComplaint = async (req, res) => {
    const complaint = req.body;

    const newComplaint = new Complaint({ ...complaint, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newComplaint.save();

        res.status(201).json(newComplaint );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateComplaint = async (req, res) => {
    const { id } = req.params;
    const { status, response } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No complaint with id: ${id}`);

    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

        res.status(201).json(updatedComplaint);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

