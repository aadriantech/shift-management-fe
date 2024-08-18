import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'system_admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const shifts = await db.collection('shifts').find().toArray();
    const csv = shifts.map(shift => {
      return `${shift.date},${shift.timeslots.join(' ')},${shift.company},${shift.acceptedBy || 'N/A'},${shift.role},${shift.shiftType},${shift.timeslots.length * 8}`; // Assuming each timeslot is 8 hours
    }).join('\n');
    const headers = 'Date,Time,Name of Home/Company,Name of Helper,Role of Helper,Task of Helper,Shift Duration\n';
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=shifts.csv');
    res.status(200).send(headers + csv);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
