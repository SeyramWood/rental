import { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => token?.userType === "tenant",
    },
    pages: {
        signIn: '/signin',
        newUser: '/dashboard' 
      },
})