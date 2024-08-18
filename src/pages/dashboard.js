import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ShiftList from '../components/ShiftList';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="mb-6 space-x-4">
          <Link href="/create-shift">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Shift
            </a>
          </Link>
          {(session.user.role === 'system_admin' || session.user.role === 'primary_user') && (
            <Link href="/manage-users">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Manage Users
              </a>
            </Link>
          )}
          <Link href="/reports">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Reports
            </a>
          </Link>
          {session.user.role === 'system_admin' && (
            <Link href="/export-shifts">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Export Shifts
              </a>
            </Link>
          )}
        </div>
        <ShiftList />
      </div>
    </Layout>
  );
}
