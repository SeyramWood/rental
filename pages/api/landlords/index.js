import Landlord from '../../../models/landlord.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()

    const {method} = req;

    if (method === 'GET') {
        let landlords = await Landlord.find({})
       return res.status(200).json(landlords)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}