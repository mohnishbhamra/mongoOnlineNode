const mongoose = require('mongoose');
personSchemaJson = {
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: String
}
const personSchema = mongoose.Schema(
    personSchemaJson, { timestamps: true }
)

module.exports = mongoose.model("personDocument", personSchema);