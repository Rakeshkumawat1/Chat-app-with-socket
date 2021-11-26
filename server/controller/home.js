const UserHome = require('../models/newUser');
const User = require('../models/user');

exports.allUserList = async (req, res) => {
    let uid = req.body.uid;
    if (!uid) return res.status(400).json({ error: 'Invalid user!' });
    try {
        let skeepField = { _id: 0, userGroupsArr: 0, uid: 0, __v: 0, singleUsersArr: { $slice: [0, 5] } }
        const result = await UserHome.findOne({ uid }, skeepField);
        if (result) {
            const name = await User.find({ uid: {$in: result.singleUsersArr}}, {_id:0, firstName:1, uid:1});
            res.status(200).json({message: name});
        } else {
            res.status(400).json({ error: "No more users..." })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Internel server error!' });
    }
}