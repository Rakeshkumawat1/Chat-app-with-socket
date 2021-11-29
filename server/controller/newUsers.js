const UserHome = require('../models/newUser');
const User = require('../models/user');

exports.newUsers = async (req, res) => {
    if (!req.body.mobile) return res.status(400).json({ error: 'Mobile number require!' });
    // console.log(req.body)
    try {
        // Checking user exitst or not
        // const [data1, data2] = await Promise.all([mongoQuery1, mongoQuery2]);
        const resOldUser = await User.findOne({ uid: req.body.uid }).exec()
        if (resOldUser) {
            let uidOldUser = resOldUser.uid;
            let mobile = req.body.mobile;

            // Chacking new user exist or not
            const uidNewUser = await User.findOne({ mobile }).exec();
            if (uidNewUser) {
                let query = { uid: uidOldUser };
                let update = { $addToSet: { "singleUsersArr": uidNewUser.uid } };
                let options = { returnNewDocument: true, upsert: true };

                // Finding and updating or inserting document of a user
                UserHome.findOneAndUpdate(query, update, options)
                    .then(updatedDocument => {
                        if (updatedDocument) {
                            res.status(200).json({ message: 'User added to your list successfully!' })
                        } else {
                            res.status(200).json({ message: 'User added to your list successfully!' })
                        }
                    })
                    .catch(err => res.status(400).json({ error: 'Update faild! due to Internel server error!' }))
            } else {
                res.status(400).json({ error: 'This number is not registered!' })
            }

        } else {
            res.status(404).json({ error: "Invalid request!.." })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Internel server error!' });
    }
}