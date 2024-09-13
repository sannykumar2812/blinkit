import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "./models";
import AdminJSFastify from "@adminjs/fastify";
import { sessionStore } from "./config";
import { DEFAULT } from ".";
import { Authenticate } from "./config";

AdminJS.registerAdapters({
    AdminJSMongoose
})

export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ['phone', 'role', "isActivated"],
                filterProperties: ['phone', 'role'],
            }
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ['email', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ['email', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Models.Branch,
        }
    ],
    branding: {
        companyName: "Sunny's Blinkit",
        withMadeWithLove: false
    },
    rootPath: "/admin",
})

export const buildAdminRouter = async (app) => {
    await AdminJSFastify.buildeAuthenticatedRouter(admin, {
        Authenticate,
        cookieName: "adminjs",
        cookiePassword: DEFAULT.COOKIE_PASSWORD
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