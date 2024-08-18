import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [helperFormData, setHelperFormData] = useState({
    name: '',
    phone: '',
    role: '',
    zipCode: '',
    address: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchHelpers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchHelpers = async () => {
    try {
      const response = await axios.get('/api/helpers');
      setHelpers(response.data);
    } catch (error) {
      console.error('Failed to fetch helpers:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHelperChange = (e) => {
    setHelperFormData({ ...helperFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', formData);
      alert('User created successfully');
      fetchUsers();
      setFormData({ username: '', password: '', role: '' });
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Error creating user');
    }
  };

  const handleHelperSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/helpers', helperFormData);
      alert(`Helper created successfully. Login code: ${response.data.loginCode}`);
      fetchHelpers();
      setHelperFormData({ name: '', phone: '', role: '', zipCode: '', address: '' });
    } catch (error) {
      console.error('Failed to create helper:', error);
      alert('Error creating helper');
    }
  };

  const handleRegenerateCode = async (helperId) => {
    try {
      const response = await axios.post('/api/helpers/regenerate-code', { helperId });
      alert(`New login code generated: ${response.data.newLoginCode}`);
      fetchHelpers();
    } catch (error) {
      console.error('Failed to regenerate login code:', error);
      alert('Error regenerating login code');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a role</option>
            <option value="primary_user">Primary User</option>
            <option value="employee_user">Employee User</option>
          </select>
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create User
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Helper</h2>
        <form onSubmit={handleHelperSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={helperFormData.name}
            onChange={handleHelperChange}
            placeholder="Name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <input
            type="tel"
            name="phone"
            value={helperFormData.phone}
            onChange={handleHelperChange}
            placeholder="Phone"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <select
            name="role"
            value={helperFormData.role}
            onChange={handleHelperChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a role</option>
            <option value="PSW">PSW</option>
            <option value="Nurse">Nurse</option>
          </select>
          <input
            type="text"
            name="zipCode"
            value={helperFormData.zipCode}
            onChange={handleHelperChange}
            placeholder="Zip Code"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <input
            type="text"
            name="address"
            value={helperFormData.address}
            onChange={handleHelperChange}
            placeholder="Address"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Helper
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User List</h2>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id} className="py-4">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Helper List</h2>
        <ul className="divide-y divide-gray-200">
          {helpers.map((helper) => (
            <li key={helper._id} className="py-4">
              <p className="text-sm font-medium text-gray-900">{helper.name}</p>
              <p className="text-sm text-gray-500">{helper.role}</p>
              <p className="text-sm text-gray-500">{helper.phone}</p>
              <button
                onClick={() => handleRegenerateCode(helper._id)}
                className="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Regenerate Login Code
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
