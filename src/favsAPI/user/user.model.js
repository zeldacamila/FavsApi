const { model, Schema, models } = require("mongoose")


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        async validator(email) {
          try {
            const user = await models.user.findOne({ email })
            return !user
          } catch (err) {
            return false
          }
        },
        message: "This email already exists"
      },
    },
    password: {
      type: String,
      required: true
    },
    favslists: {
      type: [{ type: Schema.Types.ObjectId, ref: "favslist"}],
      required: false
    }
  },
  { timestamps: true }
)

const User = model("user", userSchema)

module.exports = User
