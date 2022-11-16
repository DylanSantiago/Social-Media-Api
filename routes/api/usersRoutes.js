const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userscontroller');

router.route('/').get(getUsers).post(createNewUser);

router.route('/:thoughtId').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:thoughtId/reactions').post(addFriend);

router.route('/:thoughtId/reactions/:reactionId').delete(removeFriend)

module.exports = router;