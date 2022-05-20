
import PropertyAdvance from '../../../models/propertyAdvance.model';
import Property from '../../../models/property.model';
import dbConnection from '../../../libs/dbConnection';



export default async function handler(req, res) {
  await dbConnection()
  const {method, body} = req;
  
  if (method === 'POST') {

      const advance = await PropertyAdvance.create(body)
      await Property.findOneAndUpdate({_id:req.body.landlordId}, {status:true})

      return res.status(200).json(advance)
  }else{
      return res.status(405).json({error:'Method not allowed.'})
  }
  
}
