import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) {
                    console.log('User is On Dashboard and Logged in!');
                    return true;
                } else {
                    console.log('User is On Dashbaord and Not Logged in!');
                    return false;
                }
            } else if (isLoggedIn && nextUrl.pathname.startsWith('/login')) {
                console.log("User is logged in! And Should be redirected!");
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;