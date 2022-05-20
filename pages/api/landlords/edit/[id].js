
import Landlord from '../../../../models/landlord.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    if (method === 'PUT') {
        const landlord = await Landlord.findOneAndUpdate({_id:req.query.id}, body)
        if(landlord){
            return res.status(200).json({message:"Landlord updated", landlord });
        }
        return res.status(500).json({message:"Landlord could not be updated"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}