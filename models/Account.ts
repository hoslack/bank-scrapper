import mongoose from "mongoose"
import { IAccount } from "../interfaces"

const accountSchema = new mongoose.Schema<IAccount>({
    accountNumber: {
        type: String,
        required: false
    },
    accountName: {
        type: String,
        required: false
    },
    accountType: {
        type: String,
        required: false
    },  
    accountCurrency: {
        type: String,
        required: false
    },
    ledgerBalance: {
        type: Number,
        required: false
    },
    availableBalance: {
        type: Number,
        required: false
    }
})

export default mongoose.model('Hos-Account', accountSchema)


