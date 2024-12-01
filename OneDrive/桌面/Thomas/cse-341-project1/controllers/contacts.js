const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
// swagger.tads=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async(req, res) => {
// swagger.tads=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
    result.toArray().then((listss) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(listss[0]);
    });
};

const createContact = async (req, res) => {
    // swagger.tads=['Contacts']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor:req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne(contact);
        if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const updateContact = async (req, res) => {
    // swagger.tads=['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, contact);
        if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    } 
};

const deleteContact = async (req, res) => {
    // swagger.tads=['Contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
    res.status(204).send();    
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};