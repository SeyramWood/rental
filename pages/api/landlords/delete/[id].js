
import Landlord from '../../../../models/landlord.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method} = req;
    if (method === 'DELETE') {
        const landlord = await Landlord.findOneAndDelete({_id:req.query.id})
        if(landlord){
           return res.status(200).json({message:"Landlord deleted"})
        }
        return res.status(500).json({message:"Landlord could not be deleted"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}