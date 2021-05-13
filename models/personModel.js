const mongoose = require('mongoose');
personSchemaJson = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    nameObjectList: Object,
    gender: String,
    phone: String,
}
const personSchema = mongoose.Schema(
    personSchemaJson, { timestamps: true }
)

module.exports = mongoose.model("personDocument", personSchema);