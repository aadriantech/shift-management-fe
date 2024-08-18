import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { staffCategory, role, shiftType, date, timeslots } = req.body;
    const newShift = {
      staffCategory,
      role,
      shiftType,
      date,
      timeslots,
      status: 'Pending',
      createdBy: session.user.name,
      company: session.user.company,
      createdAt: new Date()
    };
    const result = await db.collection('shifts').insertOne(newShift);
    res.status(201).json({ success: true, shiftId: result.insertedId });
  } else if (req.method === 'GET') {
    const shifts = await db.collection('shifts').find({ company: session.user.company }).toArray();
    res.status(200).json(shifts);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const result = await db.collection('shifts').deleteOne({ _id: ObjectId(id), company: session.user.company });
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Shift not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
