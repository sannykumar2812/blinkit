import mongoose from "mongoose";

{/* Branch Schema*/ }
const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    livelocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    address: {
        type: String
    },
    deliveryPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DeliveryPartner'
        }
    ]
});

export const Branch = mongoose.model('Branch', BranchSchema);