import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'

import dbConnection from '../../../libs/dbConnection'
import Admin from '../../../models/admin.model';
import Landlord from '../../../models/landlord.model';
import Tenant from '../../../models/tenant.model';



export default NextAuth({
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name:'Seydel',
            credentials:{
                username:{
                    label:'Email Address',
                    type:'email',
                    placeholder:'youremail@example.com',
                    
                },
                password:{
                    label:'Password',
                    type:'password',
                    placeholder:'Please enter your password',
                    
                }
            },
            authorize: async (credentials) => {
                await dbConnection()
                    
                if (credentials.userType === 'tenant'){
                    const {username, password} = credentials;
                    
                    let user = await Tenant.findOne({username:username})
                    
                    if (!user) return null

                    if (!bcrypt.compareSync(password, user.password)) return null
                    return {...user, id:user._id.valueOf(), username,phone:user.phone, name:user.fullName, userType:credentials.userType  }
                }
                
                if (credentials.userType === 'landlord'){
                    const {username, password} = credentials;
                    let user = await Landlord.findOne({username:username})

                    if (!user) return null

                    if (!bcrypt.compareSync(password, user.password)) return null
                    return {...user, id:user._id.valueOf(), username, phone:user.phone, name:user.fullName, userType:credentials.userType  }
                }

                if (credentials.userType === 'admin'){
                    const {username, password} = credentials;
                    let user = await Admin.findOne({username:username})

                    if (!user) return null

                    if (!bcrypt.compareSync(password, user.password)) return null
                    return {...user, id:user._id.valueOf(), username, name:user.firstName, userType:credentials.userType  }
                }
                return null
            }
            
        })
    ],
    callbacks:{
        async jwt({token, user}) {
            if (token && user) {
                token.id = user.id
                token.username = user.username
                token.name = user.name
                token.userType = user.userType
                if(user.phone){
                    token.phone = user.phone
                }
            }
            return token
        },
        async session ({session, token}) {

            if (session && token) {  
                 if(token.phone){
                    session.user = {id:token.id, username: token.username, phone: token.phone, name:token.name, userType:token.userType}
                 }else{
                    session.user = {id:token.id, username: token.username, name:token.name, userType:token.userType}
                 }
                
            }
            return session
        },
    },
    secret:"88fd4b84db89d4fdc4656",
    pages: {
        signIn: '/signin',
        newUser: '/dashboard' 
      },
    jwt:{
        secret:"88fd4b84db89d4fdc4656dffd",
        encrypt:true
    },
    
})