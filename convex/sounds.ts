// functions/sounds.ts

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * 1️⃣ Upload URL almak için mutasyon
 */
export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return await ctx.storage.generateUploadUrl();
});

/**
 * 2️⃣ Ortak havuz için ses kaydı mutasyonu
 */
export const saveSound = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { title, storageId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Yalnızca başlık ve storage ID’yi kaydediyoruz
    const soundId = await ctx.db.insert("sounds", {
      title,
      url: storageId,
    });

    return soundId;
  },
});

/**
 * 3️⃣ Tüm sesleri listeleyen sorgu
 */
export const listSounds = query(async (ctx) => {
  // Eğer herkese açık liste olmasın istersen auth kontrolü ekleyebilirsin
  const rows = await ctx.db.query("sounds").collect();

  // Her kaydın storageId'sinden gerçek URL'i alalım
  const results = await Promise.all(
    rows.map(async (s) => {
      const publicUrl = await ctx.storage.getUrl(s.url);
      return {
        id: s._id,
        title: s.title,
        url: publicUrl ?? "",
      };
    })
  );

  return results;
});
