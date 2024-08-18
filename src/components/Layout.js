import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const totalShifts = await db.collection('shifts').countDocuments({ company: session.user.company });
    const acceptedShifts = await db.collection('shifts').countDocuments({ company: session.user.company, status: 'Filled' });
    const pendingShifts = await db.collection('shifts').countDocuments({ company: session.user.company, status: 'Pending' });
    const cancelledShifts = await db.collection('shifts').countDocuments({ company: session.user.company, status: 'Cancelled' });

    const acceptanceRate = totalShifts > 0 ? (acceptedShifts / totalShifts) * 100 : 0;
    const cancellationRate = totalShifts > 0 ? (cancelledShifts / totalShifts) * 100 : 0;

    res.status(200).json({
      totalShifts,
      acceptedShifts,
      pendingShifts,
      cancelledShifts,
      acceptanceRate: acceptanceRate.toFixed(2),
      cancellationRate: cancellationRate.toFixed(2)
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
