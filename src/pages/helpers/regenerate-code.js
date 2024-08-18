import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || (session.user.role !== 'system_admin' && session.user.role !== 'primary_user')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { helperId } = req.body;
    const newLoginCode = Math.random().toString(36).substring(7).toUpperCase();
    const result = await db.collection('helpers').updateOne(
      { _id: ObjectId(helperId), company: session.user.company },
      { $set: { loginCode: newLoginCode } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, newLoginCode });
    } else {
      res.status(404).json({ success: false, error: 'Helper not found' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
