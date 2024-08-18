import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';

export default function ExportShifts() {
  const { data: session } = useSession();
  const [isExporting, setIsExporting] = useState(false);

  if (!session || session.user.role !== 'system_admin') {
    return <p>Access Denied</p>;
  }

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get('/api/shifts/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'shifts.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Failed to export shifts:', error);
      alert('Failed to export shifts');
    }
    setIsExporting(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Export Shifts</h1>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isExporting ? 'Exporting...' : 'Export Shifts to CSV'}
        </button>
      </div>
    </Layout>
  );
}
