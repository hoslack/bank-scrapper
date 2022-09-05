import mongoose from "mongoose"
import { ICustomer } from "../interfaces"

const customerSchema = new mongoose.Schema<ICustomer>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bvn: {
        type: String,
        required: true
    }
})

export default mongoose.model('Hos-Customer', customerSchema)