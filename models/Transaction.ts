import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    beneficiary: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model('Hos-Transaction', transactionSchema)