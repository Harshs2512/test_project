import { NextResponse } from 'next/server';

export async function middleware(request) {
    let cookie = request?.cookies?.get("next-auth.session-token");
    // if (!cookie?.value && request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/authentication/sign-in?authentication=you need to login', request?.url))
    // }
    // if (!cookie?.value && request.nextUrl.pathname.startsWith('/marketing/student')) {
    //     return NextResponse.redirect(new URL('/authentication/sign-in?authentication=you need to login', request?.url))
    // }
    // if(cookie){
    //    return NextResponse.next(); 
    // }
    
}
export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}