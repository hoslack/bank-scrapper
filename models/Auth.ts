import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: false
    }
})

export default mongoose.model('Hos-Auth', authSchema)