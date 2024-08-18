import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import CreateShiftForm from '../components/CreateShiftForm';

export default function CreateShift() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Shift</h1>
        <CreateShiftForm />
      </div>
    </Layout>
  );
}
