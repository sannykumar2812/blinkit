import mongoose from "mongoose";

{/* User Schema*/ }
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer', 'DeliveryPartner'],
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    }
});

{/* Customer Schema*/ }
const CustomerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['Customer'],
        default: 'Customer'
    },
    livelocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    address: {
        type: String
    }
})


{/* DeliveryPartner Schema*/ }
const DeliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['DeliveryPartner'],
        default: 'DeliveryPartner'
    },
    livelocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    address: {
        type: String
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    },
    password: {
        type: String,
        required: true
    }
})

{/* Admib Schema*/ }
const AdminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin'],
        default: ['Admin']
    },
    password: {
        type: String,
        required: true
    }

})

export const Customer = mongoose.model('Customer', CustomerSchema);
export const DeliveryPartner = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
export const Admin = mongoose.model('Admin', AdminSchema);