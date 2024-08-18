import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || (session.user.role !== 'system_admin' && session.user.role !== 'primary_user')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { name, phone, role, zipCode, address } = req.body;
    const loginCode = Math.random().toString(36).substring(7).toUpperCase();
    const newHelper = {
      name,
      phone,
      role,
      zipCode,
      address,
      loginCode,
      company: session.user.company,
      seniority: 0,
      createdAt: new Date()
    };
    const result = await db.collection('helpers').insertOne(newHelper);
    res.status(201).json({ success: true, helperId: result.insertedId, loginCode });
  } else if (req.method === 'GET') {
    const helpers = await db.collection('helpers').find({ company: session.user.company }).toArray();
    res.status(200).json(helpers);
  } else if (req.method === 'PUT') {
    const { id, role } = req.body;
    const result = await db.collection('helpers').updateOne(
      { _id: ObjectId(id), company: session.user.company },
      { $set: { role } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Helper not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
