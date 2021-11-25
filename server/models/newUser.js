const mongoose = require('mongoose');
const newUsersSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
        trim: true
    },
    singleUsersArr: {
        type: Array,
        trim: true
    },
    userGroupsArr: {
        type: Array,
        trim: true,
    }
})

module.exports = mongoose.model('UserHome', newUsersSchema);