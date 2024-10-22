import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    },
});

const conversationSchema = new mongoose.Schema({
    participants: {
        type: String,
    },
    messages: [messageSchema],
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);