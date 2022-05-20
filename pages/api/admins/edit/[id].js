import bcrypt from 'bcrypt';


import Admin from '../../../../models/admin.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    if (method === 'PUT') {
        const admin = await Admin.findOneAndUpdate({_id:req.query.id}, body)
        if(admin){
            return res.status(200).json({message:"User updated", admin });
        }
        return res.status(500).json({message:"User could not be updated"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}