import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./user";

/**
 * Yeni bir flower event’i ekler
 */
export const addFlowerEvent = mutation({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const timestamp = Date.now();
    return await ctx.db.insert("flowerEvents", {
      userId: currentUser._id,
      timestamp,
    });
  },
});

/**
 * Toplam event sayısını döner: son 24 saat, 7 gün, 30 gün, 365 gün
 */
export const getFlowerStats = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const now = Date.now();
    const ranges = {
      day: now - 24 * 3600 * 1000,
      week: now - 7 * 24 * 3600 * 1000,
      month: now - 30 * 24 * 3600 * 1000,
      year: now - 365 * 24 * 3600 * 1000,
    };

    const events = await ctx.db
      .query("flowerEvents")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .collect();

    let day = 0, week = 0, month = 0, year = 0;
    for (const ev of events) {
      const ts = ev.timestamp;
      if (ts >= ranges.day) day++;
      if (ts >= ranges.week) week++;
      if (ts >= ranges.month) month++;
      if (ts >= ranges.year) year++;
    }

    return { day, week, month, year };
  },
});

/**
 * Breakdown: periyoda göre birim bazlı (saat/gün/ay) event sayısı
 */
export const getFlowerBreakdown = query({
  args: {
    period: v.union(
      v.literal("day"),
      v.literal("week"),
      v.literal("month"),
      v.literal("year")
    ),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);
    const { period } = args;
    const now = Date.now();
    let startTime = now;
    let segments = 0;

    switch (period) {
      case "day":
        startTime -= 24 * 3600 * 1000;
        segments = 24;
        break;
      case "week":
        startTime -= 7 * 24 * 3600 * 1000;
        segments = 7;
        break;
      case "month":
        startTime -= 30 * 24 * 3600 * 1000;
        segments = 30;
        break;
      case "year":
        startTime -= 365 * 24 * 3600 * 1000;
        segments = 12;
        break;
    }

    const breakdown = Array.from({ length: segments }, (_, i) => ({
      unit: i,
      count: 0,
    }));

    const events = await ctx.db
      .query("flowerEvents")
      .withIndex("by_user", (q) => q.eq("userId", currentUser._id))
      .collect();

    for (const ev of events) {
      if (ev.timestamp < startTime) continue;
      const date = new Date(ev.timestamp);
      let idx = 0;
      switch (period) {
        case "day":
          idx = date.getHours();
          break;
        case "week":
          idx = date.getDay();
          break;
        case "month":
          idx = date.getDate() - 1;
          break;
        case "year":
          idx = date.getMonth();
          break;
      }
      if (idx >= 0 && idx < segments) breakdown[idx].count++;
    }

    return breakdown;
  },
});
