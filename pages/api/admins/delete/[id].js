
import Admin from '../../../../models/admin.model';
import dbConnection from '../../../../libs/dbConnection';



export default async function handler(req, res) {
    await dbConnection()
    const {method} = req;
    if (method === 'DELETE') {
        const admin = await Admin.findOneAndDelete({_id:req.query.id})
        if(admin){
           return res.status(200).json({message:"User deleted"})
        }
        return res.status(500).json({message:"User could not be deleted"})
    }else{
        return res.status(405).json({error:'Method not allowed.'})
    }
    
}