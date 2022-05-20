import Admin from '../../../models/admin.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()

    const {method} = req;

    if (method === 'GET') {
        let admins = await Admin.find({})
       return res.status(200).json(admins)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}