import { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => token?.userType === "landlord",
    },
    pages: {
        signIn: '/auth/landlord/signin',
        newUser: '/dashboard/landlord' 
      },
})