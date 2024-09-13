import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJSFastify from "@adminjs/fastify";
import { sessionStore } from "./config.js";

import { Admin, Customer, DeliveryPartner } from "./models/users.js";
import { authenticate } from "./config.js";
import { DEFAULT } from "./db/index.js";
import { Branch } from "./models/branch.js";
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

export const admin = new AdminJS({
    resources: [
        {
            resource: Customer,
            options: {
                listProperties: ['phone', 'role', "isActivated"],
                filterProperties: ['phone', 'role'],
            }
        },
        {
            resource: DeliveryPartner,
            options: {
                listProperties: ['email', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Admin,
            options: {
                listProperties: ['email', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Branch,
        }
    ],
    branding: {
        companyName: "Sunny's Blinkit",
        withMadeWithLove: false
    },
    rootPath: "/admin",
})

export const buildAdminRouter = async (app) => {
    await AdminJSFastify.buildAuthenticatedRouter(admin, {
        authenticate,
        cookieName: "adminjs",
        cookiePassword: DEFAULT.COOKIE_PASSWORD,
    }, app, {
        store: sessionStore,
        saveUnintialized: true,
        secret: DEFAULT.COOKIE_PASSWORD,
        cookie: {
            httpOnly: DEFAULT.NODE_ENV === 'production',
            secure: DEFAULT.NODE_ENV === 'production'
        }
    }
    )
}

