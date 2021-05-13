const mongoose = require('mongoose');
pincodeToEmailListSchemaJSON = {
    emailList: {
        type: Array,
        required: true,
    },
    emailObjectList: Array,
    pincode: {
        type: String,
        required: true,
        unique: true
    }
}
const pincodeToEmailListSchema = mongoose.Schema(
    pincodeToEmailListSchemaJSON, { timestamps: true }
)

module.exports = mongoose.model("pincodeToEmailListSchema", pincodeToEmailListSchema);