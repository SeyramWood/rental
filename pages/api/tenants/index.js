import Tenant from '../../../models/tenant.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()

    const {method} = req;

    if (method === 'GET') {
        let tenants = await Tenant.find({})
       return res.status(200).json(tenants)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}