const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    CreateUser: {
        post: async (req, res) => {
            let { snsId, nickName } = req.body

            let user

            const existUser = await User.findOne({ snsId })
            if (existUser) {
                user = existUser
            } else {
                // 존재하는 유저가 없으면 회원 가입
                const newUser = new User({ nickName, snsId, weeklyGoal: 3 })
                await newUser.save()
                user = newUser
            }

            nickName = user.nickName
            console.log(`${nickName} 로그인 또는 회원가입`)

            const userId = user.userId
            const weeklyGoal = user.weeklyGoal

            const token = jwt.sign(
                { userId, nickName, snsId, weeklyGoal },
                process.env.JWT_KEY
            )
            res.json({ token, message: '로그인 성공' })
        },
    },
    Usermodification: {
        patch: async (req, res) => {
            const { userId } = res.locals.user
            const { nickName, weeklyGoal } = req.body
            const existUser = await User.findById(userId)
            existUser.nickName = nickName
            existUser.weeklyGoal = weeklyGoal
            await existUser.save()

            const snsId = existUser.snsId

            const token = jwt.sign(
                { userId, nickName, snsId, weeklyGoal },
                process.env.JWT_KEY
            )
            res.json({ token, message: '회원정보 수정 성공' })
        },
    },
}
