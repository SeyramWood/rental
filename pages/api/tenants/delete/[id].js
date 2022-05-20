
import Tenant from '../../../../models/tenant.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method} = req;
    if (method === 'DELETE') {
        const tenant = await Tenant.findOneAndDelete({_id:req.query.id})
        if(tenant){
           return res.status(200).json({message:"Tenant deleted"})
        }
        return res.status(500).json({message:"Tenant could not be deleted"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}