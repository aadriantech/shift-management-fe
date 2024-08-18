import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Shift Management System</h1>
        {session ? (
          <Link href="/dashboard">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Go to Dashboard
            </a>
          </Link>
        ) : (
          <p className="text-xl text-gray-600">Please login to access the system.</p>
        )}
      </div>
    </Layout>
  );
}
