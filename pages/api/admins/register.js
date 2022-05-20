import bcrypt from 'bcrypt';


import Admin from '../../../models/admin.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    
    if (method === 'POST') {

        let admin = await Admin.findOne({username:body.username})
        if (admin) {
            return res.status(400).json({message:'Username already in exist.'})
        }
        const hashedPassword = await bcrypt.hash(body.password, 12)

        admin = await Admin.create({...body, password:hashedPassword})

        return res.status(200).json(admin)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}