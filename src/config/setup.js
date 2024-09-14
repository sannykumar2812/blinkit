import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJSFastify from "@adminjs/fastify";
import { sessionStore } from "./config.js";
import { authenticate } from "./config.js";
import { DEFAULT } from "./db/index.js";
import { dark, light, noSidebar } from "@adminjs/themes"
import { ICONS } from "../Asset/Icons/Icons.js";
import { Models } from "../config/models/index.js";
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ["name", 'phone', 'address', 'role', "isActivated"],
                filterProperties: ['phone', 'role'],
            }
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ['name', 'phone', 'email', 'branch', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ['name', 'email', 'role', "isActivated"],
                filterProperties: ['email', 'role'],
            }
        },
        {
            resource: Models.Branch,
        },
        {
            resource: Models.Product,
        }, {
            resource: Models.Category,
        }
    ],
    branding: {
        companyName: "Sunny's here !",
        withMadeWithLove: false,
        favicon: ICONS.Favicon_icon,
        // logo: ICONS.Favicon_icon
    },
    defaultTheme: dark.id,
    availableThemes: [light, dark, noSidebar],
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

