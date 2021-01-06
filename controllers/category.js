const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({user: req.user.id});

        res.status(200).json(categories);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.removeCategory = async (req, res) => {
    try {
        await Category.remove({_id: req.params.id});
        await Position.remove({category: req.params.id});

        res.status(200).json({
            message: 'Category has been removed'
        });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    });

    try {
        await category.save();
        res.status(200).json(category);

    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.updateCategory = async (req, res) => {
    const update = {
        name: req.body.name
    };

    if (req.file) {
        update.imageSrc = req.file.path;
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: update},
            {new: true}
        );

        res.status(200).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
};
