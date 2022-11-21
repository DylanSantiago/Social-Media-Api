const { Thought, User } = require('../models');

module.exports = {

    // Get all Thoughts created
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    // Get single Thought
    getOne(req, res) {
        Thought.findOne( {_id: req.params.thoughtId})
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought found, try a different ID!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Create a Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id }},
                { new: true}
            );
        })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'Please sign in to save thought'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err)); 
    },
   
    // Updating a selected Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought 
            ? res.status(404).json( { message: 'No thoughts found'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Deleting a selected Thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true })
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'Thought deleted, but no user found' })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // Creating a Reaction to a selected Thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }   
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thoughts found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Removing a Reaction a selected Thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: {reactionId: req.params.reactionId }}},
        { runValidators: true, new: true }   
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thoughts found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}