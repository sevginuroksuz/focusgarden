// convex/functions/uploads.ts
import { action } from "./_generated/server";

export const generateUploadUrl = action({
  handler: async (ctx) => {
    // Yeni bir public upload başlat
    const uploadUrl = await ctx.storage.generateUploadUrl();
    // Client'a URL'yi gönder
    return { uploadUrl };
  },
});
