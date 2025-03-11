import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    try {
      // This will refresh session if expired - required for Server Components
      // https://supabase.com/docs/guides/auth/server-side/nextjs
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      // protected routes
      if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      if (request.nextUrl.pathname === "/" && user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (authError) {
      // Handle auth errors gracefully
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    console.error("Supabase client creation error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
