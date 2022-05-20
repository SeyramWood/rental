import PropertyAdvance from '../../../../models/propertyAdvance.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()

    const {method} = req;

    if (method === 'GET') {
        const advances = await PropertyAdvance.find({landlordId:req.query.landlord})
       return res.status(200).json(advances)
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}