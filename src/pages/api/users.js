import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';
import { hashPassword } from '../../lib/auth';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || (session.user.role !== 'system_admin' && session.user.role !== 'primary_user')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { username, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = {
      username,
      password: hashedPassword,
      role,
      company: session.user.company,
      createdAt: new Date()
    };
    const result = await db.collection('users').insertOne(newUser);
    res.status(201).json({ success: true, userId: result.insertedId });
  } else if (req.method === 'GET') {
    const users = await db.collection('users').find({ company: session.user.company }).project({ password: 0 }).toArray();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
