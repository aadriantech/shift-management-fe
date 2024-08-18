import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import UserManagement from '../components/UserManagement';

export default function ManageUsers() {
  const { data: session } = useSession();

  if (!session || (session.user.role !== 'system_admin' && session.user.role !== 'primary_user')) {
    return <p>Access Denied</p>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Users</h1>
        <UserManagement />
      </div>
    </Layout>
  );
}
