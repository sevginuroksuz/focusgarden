// convex/auth.config.js

/** @type {import("convex/auth").AuthConfig} */
export default {
  providers: [
    {
      // Clerk Dashboard → API Keys → Frontend API URL
      // Bunu .env.local veya .env dosyana eklediğin değişkenden al
      domain: process.env.CLERK_FRONTEND_API_URL,
      // Convex için sabit kalması gereken uygulama kimliği
      applicationID: "convex",
    },
  ],
};
