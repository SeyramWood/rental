
import Property from '../../../../models/property.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    if (method === 'PUT') {
        const property = await Property.findOneAndUpdate({_id:req.query.id}, body)
        if(property){
            return res.status(200).json({message:"Property updated", property });
        }
        return res.status(500).json({message:"Property could not be updated"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}