/**
 * An array of routes accessible to public
 * These routes donot require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/","/product","/product/:id",
];

/**
 * An array of routes used for authentication
 * These routes will derict logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login","/auth/register","/auth/adminLogin"
];

/**
 * An array of routes used for authentication
 * These routes will derict logged in users to /settings
 * @type {string[]}
 */
export const adminRoute = "/admin"

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API auhtentication proposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/admin/product";