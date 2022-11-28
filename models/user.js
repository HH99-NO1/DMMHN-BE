const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
        },
        snsId: {
            type: Number,
        },
        weeklyGoal: {
            type: Number,
        },
    },
    { timestamps: true }
)

userSchema.virtual('userId').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.model('User', userSchema)
