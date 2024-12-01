const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Sellers']
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('sellers')
        .find();
    result.toArray().then((sellers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sellers);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid seller ID to find a seller.');
    }
    //#swagger.tags=['Sellers']
    const sellerId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('sellers')
        .find({ _id: sellerId });
    result.toArray().then((sellers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(sellers[0]);
    });
};

const createSeller = async (req, res) => {
    //#swagger.tags=['Sellers']
    const seller = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        joinDate: req.body.joinDate,
        productsSold: req.body.productsSold,
        isActive: req.body.isActive,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('sellers')
        .insertOne(seller);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the seller');
    }
};

const updateSeller = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid seller ID to update a seller.');
    }
    //#swagger.tags=['Sellers']
    const sellerId = new ObjectId(req.params.id);
    const seller = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        joinDate: req.body.joinDate,
        productsSold: req.body.productsSold,
        isActive: req.body.isActive,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('sellers')
        .replaceOne({ _id: sellerId }, seller);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the seller');
    }
};

const deleteSeller = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid seller ID to delete a seller.');
    }

    //#swagger.tags=['Sellers']
    const sellerId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('sellers')
        .deleteOne({ _id: sellerId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the seller.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createSeller,
    updateSeller,
    deleteSeller
};