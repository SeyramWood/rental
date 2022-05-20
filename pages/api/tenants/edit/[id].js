
import Tenant from '../../../../models/tenant.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method, body} = req;
    if (method === 'PUT') {
        const tenant = await Tenant.findOneAndUpdate({_id:req.query.id}, body)
        if(tenant){
            return res.status(200).json({message:"Tenant updated", tenant });
        }
        return res.status(500).json({message:"Tenant could not be updated"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}