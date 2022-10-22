const User = require('../user/user.model')
const FavsList = require('./favsList.model')

  //GET Get all list of favorites
  const show = async (req, res) => {
    try {
      const id = req.user
      const user = await User.findById(id)
      const favsLists = await FavsList.find({user: id})
      res.status(200).json({ message: 'Favs Lists founded', data: favsLists})
    } catch(err) {
      res.status(400).json({ message: 'Favs Lists not founded', data: err})
    }
  }

  //POST 	Creates a new list of favorites
  const create = async (req, res) => {
    try{
      const favslistData = req.body
      const id = req.user
      const user = await User.findById(id)
      const newFavsList = await FavsList.create({ ...favslistData, user: id })
      user.favslists.push(newFavsList)
      await user.save({ validateBeforeSave: false })
      res.status(201).json({ message: 'Favs list created', data: newFavsList})
    } catch(err) {
      res.status(400).json({ message: 'Favs list could not be created', data: err})
    }
  }

  //GET:id Get a single list of favorites
  const list = async (req, res) => {
    try {
      const  { favsListId } = req.params
      const id = req.user
      const user = await User.findById(id)
      const favsList = await FavsList.find({_id: favsListId, user: id}).populate({
        path: 'user',
        select: 'email'
      })
      res.status(200).json({ message: 'Favs List found', data: favsList})
    } catch(err) {
      res.status(404).json({ message: 'Favs List does not exist', data: err})
    }
  }

  //PUT:id Update a single list of favorites to add favorites
  const addFavs = async (req, res) => {
    try {
      const  { favsListId } = req.params
      const updatefavlist = req.body
      const id = req.user
      const user = await User.findById(id)
      const favsListupdated = await FavsList.findByIdAndUpdate(favsListId, updatefavlist, {new: true})
      console.log(favsListupdated)
      res.status(200).json({ message: 'Fav added', data: favsListupdated})
    } catch(err) {
      res.status(404).json({ message: 'Fav could not be added', data: err})
    }
  }


  //DELETE:id Deletes a list of favorites
  const destroy = async (req, res) => {
    try {
      const { favsListId } = req.params
      const favsList = await FavsList.findByIdAndDelete(favsListId)
      res.status(200).json({ message: 'Favs List deleted', data: favsList})
    } catch(err) {
      res.status(404).json({ message: 'Favs List does not exist', data: err})
    }
  }


  module.exports = { create, show, list, destroy, addFavs }