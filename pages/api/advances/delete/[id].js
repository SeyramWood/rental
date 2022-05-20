
import Property from '../../../../models/property.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method} = req;
    if (method === 'DELETE') {
        const property = await Property.findOneAndDelete({_id:req.query.id})
        if(property){
           return res.status(200).json({message:"Property deleted"})
        }
        return res.status(500).json({message:"Property could not be deleted"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}