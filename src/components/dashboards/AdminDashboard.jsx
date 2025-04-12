import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    totalPresent: 1156,
    totalAbsent: 78,
    onLeave: 45,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        totalPresent: prev.totalPresent + Math.floor(Math.random() * 3),
        totalAbsent: prev.totalAbsent + Math.floor(Math.random() * 2),
        onLeave: prev.onLeave,
      }));
    }, 5000);

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
        label: 'Overall Attendance Rate',
        data: [92, 88, 95, 89, 91, 93, 94],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.3,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Target Rate',
        data: Array(7).fill(90),
        borderColor: 'rgba(220, 38, 38, 0.5)',
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  };

  const departmentData = {
    labels: ['Computer Science', 'Engineering', 'Business', 'Arts', 'Medicine'],
    datasets: [
      {
        label: 'Department-wise Attendance',
        data: [88, 92, 85, 90, 87],
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

  const genderDistributionData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [45, 48, 7],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
      },
    ],
  };

  const handleNotifyDefaulters = () => {
    toast.success('Notifications sent to defaulters and their parents');
  };

  const handleExportReport = () => {
    toast.success('Report exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-blue-50 dark:bg-blue-900"
        >
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            {realTimeData.totalPresent}
          </p>
          <p className="text-sm text-blue-600/70 dark:text-blue-300/70 mt-2">
            Live Updates
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-red-50 dark:bg-red-900"
        >
          <h3 className="text-lg font-semibold mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-300">
            {realTimeData.totalAbsent}
          </p>
          <p className="text-sm text-red-600/70 dark:text-red-300/70 mt-2">
            Requires Attention
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-yellow-50 dark:bg-yellow-900"
        >
          <h3 className="text-lg font-semibold mb-2">On Leave</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            {realTimeData.onLeave}
          </p>
          <p className="text-sm text-yellow-600/70 dark:text-yellow-300/70 mt-2">
            Approved Leaves
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-green-50 dark:bg-green-900"
        >
          <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            {((realTimeData.totalPresent / (realTimeData.totalPresent + realTimeData.totalAbsent)) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-600/70 dark:text-green-300/70 mt-2">
            Overall Rate
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          onClick={handleNotifyDefaulters}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📱</div>
            <div>
              <h3 className="text-lg font-semibold">Notify Defaulters</h3>
              <p className="text-sm opacity-90">Send alerts to students with low attendance</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white"
          onClick={handleExportReport}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-lg font-semibold">Export Report</h3>
              <p className="text-sm opacity-90">Download detailed attendance report</p>
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
            <h3 className="text-xl font-semibold">Attendance Trends</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field w-36"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
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
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                y: {
                  min: 60,
                  max: 100,
                  ticks: {
                    callback: value => value + '%',
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Department Statistics</h3>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field w-36"
            >
              <option value="all">All Departments</option>
              <option value="cs">Computer Science</option>
              <option value="eng">Engineering</option>
              <option value="bus">Business</option>
            </select>
          </div>
          <Bar 
            data={departmentData} 
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

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Gender Distribution</h3>
          <div className="flex items-center justify-center">
            <div className="w-64">
              <Doughnut
                data={genderDistributionData}
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
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New student registered', time: '2 minutes ago', type: 'info' },
              { action: 'Bulk attendance upload', time: '1 hour ago', type: 'success' },
              { action: 'Low attendance alert sent', time: '2 hours ago', type: 'warning' },
              { action: 'Monthly report generated', time: '3 hours ago', type: 'info' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'success' ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
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

export default AdminDashboard;