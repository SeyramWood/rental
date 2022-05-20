import { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"


export default withAuth({
    callbacks: {
        authorized: ({ token }) => token?.userType === "admin",
    },
    pages: {
        signIn: '/auth/admin/signin',
        newUser: '/dashboard/admin' 
      },
})