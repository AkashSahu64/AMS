import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addNotification } from '../store/slices/notificationSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [holidayNotification, setHolidayNotification] = useState({
    title: '',
    message: '',
    date: '',
  });

  const handleSendAbsentAlert = (studentId) => {
    // Mock sending SMS/Email/WhatsApp
    toast.success('Absent alert sent to parents');
    dispatch(addNotification({
      id: Date.now(),
      type: 'absent',
      message: 'Absent alert sent to parents',
      timestamp: new Date().toISOString(),
    }));
  };

  const handleLeaveApproval = (requestId, status) => {
    // Mock leave approval/rejection
    toast.success(`Leave request ${status}`);
    dispatch(addNotification({
      id: Date.now(),
      type: 'leave',
      message: `Leave request ${status}`,
      timestamp: new Date().toISOString(),
    }));
  };

  const handleHolidayNotification = (e) => {
    e.preventDefault();
    // Mock scheduling holiday notification
    toast.success('Holiday notification scheduled');
    dispatch(addNotification({
      id: Date.now(),
      type: 'holiday',
      message: holidayNotification.message,
      timestamp: new Date().toISOString(),
    }));
    setHolidayNotification({ title: '', message: '', date: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold mb-8">Notifications & Alerts</h1>

        {/* Absent Alert System */}
        {(role === 'admin' || role === 'teacher') && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Absent Alert System</h2>
            <div className="space-y-4">
              {[
                { id: 1, name: 'John Doe', class: '10A', consecutive_absences: 3 },
                { id: 2, name: 'Jane Smith', class: '11B', consecutive_absences: 2 },
              ].map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-500">
                      Class: {student.class} | Consecutive Absences: {student.consecutive_absences}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSendAbsentAlert(student.id)}
                    className="btn-primary"
                  >
                    Send Alert
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leave Approval System */}
        {(role === 'admin' || role === 'teacher') && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Leave Approval System</h2>
            <div className="space-y-4">
              {[
                { id: 1, student: 'Alice Johnson', reason: 'Medical appointment', date: '2023-11-20' },
                { id: 2, student: 'Bob Wilson', reason: 'Family function', date: '2023-11-22' },
              ].map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{request.student}</h3>
                    <p className="text-sm text-gray-500">
                      {request.reason} | Date: {request.date}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleLeaveApproval(request.id, 'approved')}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleLeaveApproval(request.id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Holiday Notifications */}
        {role === 'admin' && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Holiday Notifications</h2>
            <form onSubmit={handleHolidayNotification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Title
                </label>
                <input
                  type="text"
                  value={holidayNotification.title}
                  onChange={(e) =>
                    setHolidayNotification((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={holidayNotification.message}
                  onChange={(e) =>
                    setHolidayNotification((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="input-field"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={holidayNotification.date}
                  onChange={(e) =>
                    setHolidayNotification((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="input-field"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Schedule Notification
              </button>
            </form>
          </div>
        )}

        {/* Notification History */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Notification History</h2>
          <div className="space-y-4">
            {[
              { id: 1, type: 'absent', message: 'Absent alert sent for John Doe', timestamp: '2023-11-15 09:30' },
              { id: 2, type: 'leave', message: 'Leave request approved for Alice Johnson', timestamp: '2023-11-14 14:20' },
              { id: 3, type: 'holiday', message: 'Diwali holiday notification sent', timestamp: '2023-11-13 11:45' },
            ].map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    notification.type === 'absent' ? 'bg-red-500' :
                    notification.type === 'leave' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} />
                  <p className="font-medium">{notification.message}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;