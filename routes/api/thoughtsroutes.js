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

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOne).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;