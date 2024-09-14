import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { products, categories } from './seedData.js';

import { Models } from './src/config/models/index.js';
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Models.Product.deleteMany({});
        await Models.Category.deleteMany({});

        const categoryDocs = await Models.Category.insertMany(categories);

        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {});
        const productwithCategoryIds = products.map(product => {
            return {
                ...product,
                category: categoryMap[product.category]
            }
        })
        await Models.Product.insertMany(productwithCategoryIds);

        console.log('Database seeded successfully');

    } catch (err) {
        console.log('Error while seeding database :-', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase()