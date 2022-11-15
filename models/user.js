const { Schema, model } = require('mongoose');

const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = (email) => {
    return re.test(email)
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [re, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    },
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('user', userSchema);
module.exports = User
