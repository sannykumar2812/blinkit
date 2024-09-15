import { getAllcategories } from "../../controller/product/category.js";
import { getProductsByCategoryId } from "../../controller/product/product.js";

const categoriesRoutes = async (fastify, options) => {
    fastify.get('/categories', getAllcategories)
}

const productsRoutes = async (fastify, options) => {
    fastify.get('/products/:categoryId', getProductsByCategoryId)
}

export {
    categoriesRoutes,
    productsRoutes
}