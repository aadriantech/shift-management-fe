import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateShiftForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    staffCategory: '',
    role: '',
    shiftType: '',
    date: '',
    timeslots: {},
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeslotChange = (timeslot, count) => {
    setFormData(prevState => ({
      ...prevState,
      timeslots: {
        ...prevState.timeslots,
        [timeslot]: count
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/shifts', formData);
      alert('Shift created successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create shift:', error);
      alert('Error creating shift');
    }
  };

  const nextStep = () => setStep(step + 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 1: Pick a Staff Category</h2>
            <select
              name="staffCategory"
              value={formData.staffCategory}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="PSW">PSW (Personal Support Worker)</option>
              <option value="Nurse">Nurse</option>
            </select>
            <button onClick={nextStep} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 2: Pick a Specific Role</h2>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a role</option>
              {formData.staffCategory === 'PSW' ? (
                <option value="Floor Duty">Floor Duty</option>
              ) : (
                <option value="RN">RN</option>
              )}
            </select>
            <button onClick={nextStep} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 3: Pick a Timeslot and Number of People</h2>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
            {['Morning', 'Afternoon', 'Evening', 'Night'].map(timeslot => (
              <div key={timeslot} className="flex items-center space-x-2">
                <label className="w-24">{timeslot}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.timeslots[timeslot] || 0}
                  onChange={(e) => handleTimeslotChange(timeslot, parseInt(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
            ))}
            <button onClick={handleSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Shift
            </button>
          </div>
        );
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {renderStep()}
    </form>
  );
}
