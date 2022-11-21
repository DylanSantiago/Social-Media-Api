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

// Retrieves all Users and Creates a User
router.route('/').get(getUsers).post(createNewUser);

// Retrives single User, Updates and Deletes specific User
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// Adds Friends to selected User
router.route('/:userId/friends/:friendId').post(addFriend);

// Deletes Friend from selected User
router.route('/:userId/friends/:friendId').delete(removeFriend)

module.exports = router;