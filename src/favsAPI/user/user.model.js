const { model, Schema, models } = require('mongoose')

//const passRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        async validator(email) {
          console.log(email)
          try {
            const user = await models.User.findOne({ email })
            return !user
          } catch (err) {
            return false
          }
          
        },
        message: "Email has already been taken"
      }
    },
    password: {
      type: String,
      required: true,
      //match: [passRegexp, 'The password must be at least 8-16 characters long, with at least one digit, one lowercase, one uppercase, and one non-alphanumeric character.']
    },
    favslists: {
      type: [{ type: Schema.Types.ObjectId, ref: 'FavsList' }],
      required: false
    }
  }, 
  { 
    timestamps: true,
    versionKey: false
  }
)

const User = model('User', userSchema)

module.exports = User
