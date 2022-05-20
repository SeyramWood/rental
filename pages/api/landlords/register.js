import bcrypt from 'bcrypt';


import Landlord from '../../../models/landlord.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    
    if (method === 'POST') {
        let landlord = await Landlord.findOne({username:body.username})
        if (landlord) {
            return res.status(400).json({message:'Landlord already in exist.'})
        }
        const hashedPassword = await bcrypt.hash(body.password, 12)

        landlord = await Landlord.create({...body, password:hashedPassword})

        return res.status(200).json(landlord)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}