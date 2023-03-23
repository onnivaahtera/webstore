import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      if (
        req.nextUrl.pathname === "/account/admin" ||
        req.nextUrl.pathname === "/account/admin/orders"
      ) {
        return token?.role === "Admin";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/account/admin",
    "/account/admin/orders",
    "/account",
    "/account/info",
    "/account/orders",
  ],
};
