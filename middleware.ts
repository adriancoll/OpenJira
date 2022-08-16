// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { singleEntryMiddleware } from "./middlewares";

export function middleware(req: NextRequest) {
  console.log({ method: req.method });
  
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    singleEntryMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/entries/:path"],
};
