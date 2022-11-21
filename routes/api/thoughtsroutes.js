const router = require('express').Router();

const {
    getThoughts,
    getOne,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtscontroller');

// Retrieves all Thoughts and Creates one
router.route('/').get(getThoughts).post(createThought);

// Retrives selected Thoughts
router.route('/:thoughtId').get(getOne).put(updateThought).delete(deleteThought);

// Retrives Reactions to Thoughts
router.route('/:thoughtId/reactions').post(createReaction);

// Deletes Reactions to Thoughts
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;