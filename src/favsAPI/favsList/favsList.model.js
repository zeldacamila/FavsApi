const { Schema, model } = require('mongoose')

const favsListSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [12, "FavsList's name is too long"],
    },
    favs: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const FavsList = model('Favslist', favsListSchema)

module.exports = FavsList
