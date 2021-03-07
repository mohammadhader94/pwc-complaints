import mongoose from 'mongoose';

const ComplaintSchema = mongoose.Schema({
    title: String,
    dateOfIncidence: {
        type: Date,
        default: new Date()
    },
    locationOfIncidence: String,
    description: String,
    applicableCategories: [String],
    hasReportedBefore: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Pending",
        enum: ['Pending', 'Resolved', 'Dismissed']
    },
    response: String,
    selectedFile: String,
    creator: String,
    creatorName: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Complaint = mongoose.model('Complaint', ComplaintSchema);

export default Complaint;
