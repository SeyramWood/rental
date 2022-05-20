import bcrypt from 'bcrypt';


import Tenant from '../../../models/tenant.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    
    if (method === 'POST') {

        console.log(body)

        let tenant = await Tenant.findOne({username:body.username})
        if (tenant) {
            return res.status(400).json({message:'Username already in exist.'})
        }
        const hashedPassword = await bcrypt.hash(body.password, 12)

        tenant = await Tenant.create({...body, password:hashedPassword})

        return res.status(200).json(tenant)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}