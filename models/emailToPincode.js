const mongoose = require('mongoose');
emailToPincodeSchemaJSON = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    pincode: {
        type: String,
        required: true
    }
}
const emailToPincodeSchema = mongoose.Schema(
    emailToPincodeSchemaJSON, { timestamps: true }
)

module.exports = mongoose.model("emailToPincodeSchema", emailToPincodeSchema);