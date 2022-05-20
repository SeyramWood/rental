import Property from '../../../models/property.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection();

    const {method} = req;

    if (method === 'GET') {
        const properties = await Property.find({})
       return res.status(200).json(properties)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}