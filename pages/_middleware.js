
import { NextResponse } from 'next/server'
import { getSession } from "next-auth/react"

export async function middleware(req, res) {
    
    // const session = req.cookies['next-auth.session-token'];
    // const t = await getSession({req})
    // console.log(t)
    // if(session){
    //     const url = req.nextUrl.clone()
    //     url.pathname = '/dashboard'
    //     if(req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/signup')) return NextResponse.redirect(url)
    //     return NextResponse.next()
    // }else{
    //     const url = req.nextUrl.clone()
    //     url.pathname = '/'
    //     if(req.nextUrl.pathname.startsWith('/dashboard')) return NextResponse.redirect(url)
    // }
    return NextResponse.next()
  }