import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [attendanceStats, setAttendanceStats] = useState({
    totalClasses: 180,
    attended: 165,
    leaves: 8,
    absences: 7,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendanceStats(prev => ({
        ...prev,
        totalClasses: prev.totalClasses + 1,
        attended: prev.attended + 1,
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const generateDateLabels = () => {
    return Array.from({ length: 7 }, (_, i) => 
      format(subDays(new Date(), 6 - i), 'MMM dd')
    );
  };

  const attendanceData = {
    labels: generateDateLabels(),
    datasets: [
      {
        label: 'Your Attendance',
        data: [1, 1, 0, 1, 1, 1, 1],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.3,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
    ],
  };

  const subjectData = {
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    datasets: [
      {
        label: 'Subject-wise Attendance',
        data: [95, 88, 92, 85, 90],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
      },
    ],
  };

  const performanceData = {
    labels: ['Present', 'Leaves', 'Absences'],
    datasets: [
      {
        data: [attendanceStats.attended, attendanceStats.leaves, attendanceStats.absences],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
      },
    ],
  };

  const handleLeaveRequest = () => {
    toast.success('Leave request submitted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-blue-50 dark:bg-blue-900"
        >
          <h3 className="text-lg font-semibold mb-2">Overall Attendance</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            {((attendanceStats.attended / attendanceStats.totalClasses) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-blue-600/70 dark:text-blue-300/70 mt-2">
            {attendanceStats.attended} of {attendanceStats.totalClasses} classes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-green-50 dark:bg-green-900"
        >
          <h3 className="text-lg font-semibold mb-2">Classes Attended</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            {attendanceStats.attended}
          </p>
          <p className="text-sm text-green-600/70 dark:text-green-300/70 mt-2">
            Present Days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-yellow-50 dark:bg-yellow-900"
        >
          <h3 className="text-lg font-semibold mb-2">Approved Leaves</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            {attendanceStats.leaves}
          </p>
          <p className="text-sm text-yellow-600/70 dark:text-yellow-300/70 mt-2">
            Total Leaves
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-red-50 dark:bg-red-900"
        >
          <h3 className="text-lg font-semibold mb-2">Absences</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-300">
            {attendanceStats.absences}
          </p>
          <p className="text-sm text-red-600/70 dark:text-red-300/70 mt-2">
            Unexcused Absences
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/mark-attendance">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📝</div>
              <div>
                <h3 className="text-lg font-semibold">Mark Today's Attendance</h3>
                <p className="text-sm opacity-90">Use face recognition or manual entry</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white"
          onClick={handleLeaveRequest}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📅</div>
            <div>
              <h3 className="text-lg font-semibold">Request Leave</h3>
              <p className="text-sm opacity-90">Submit leave application</p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Weekly Attendance</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field w-36"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="semester">Semester</option>
            </select>
          </div>
          <Line 
            data={attendanceData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => context.raw === 1 ? 'Present' : 'Absent',
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1,
                  ticks: {
                    stepSize: 1,
                    callback: value => value === 1 ? 'Present' : 'Absent',
                  },
                },
              },
            }} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Subject-wise Attendance</h3>
          <Bar 
            data={subjectData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `Attendance: ${context.raw}%`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: value => value + '%',
                  },
                },
              },
            }} 
          />
        </motion.div>
      </div>

      {/* Additional Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Attendance Distribution</h3>
          <div className="flex items-center justify-center">
            <div className="w-64">
              <Doughnut
                data={performanceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Marked attendance', date: 'Today, 9:00 AM', status: 'success' },
              { action: 'Leave request approved', date: 'Yesterday', status: 'info' },
              { action: 'Missed class', date: '2 days ago', status: 'warning' },
              { action: 'Perfect attendance bonus', date: 'Last week', status: 'success' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;