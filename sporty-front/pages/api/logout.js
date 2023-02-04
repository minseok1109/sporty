import nookies from "nookies";

export default async function handler(ctx) {
  await nookies.destroy(ctx, "access");
  await nookies.destroy(ctx, "refresh");
  await nookies.destroy(ctx, "isAuthenticated");
}
