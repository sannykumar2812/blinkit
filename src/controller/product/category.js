import Category from "../../models/category.js";

const getAllcategories = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.send(categories)
    } catch (err) {
        return res.status(500).send({ message: 'An error Occured', err })
    }
}

export {
    getAllcategories
}