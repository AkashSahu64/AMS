import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    totalStudents: 156,
    presentToday: 142,
    leaveRequests: 5,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        presentToday: Math.min(prev.presentToday + Math.floor(Math.random() * 2), prev.totalStudents),
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
        label: 'Class Attendance Rate',
        data: [95, 88, 92, 85, 90, 93, 91],
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

  const performanceData = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [
      {
        data: [30, 45, 15, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
      },
    ],
  };

  const handleSendNotification = () => {
    toast.success('Notifications sent to absent students and their parents');
  };

  const handleApproveLeave = (index) => {
    toast.success('Leave request approved');
  };

  const handleRejectLeave = (index) => {
    toast.error('Leave request rejected');
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-blue-50 dark:bg-blue-900"
        >
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
            {realTimeData.totalStudents}
          </p>
          <p className="text-sm text-blue-600/70 dark:text-blue-300/70 mt-2">
            Across all classes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-green-50 dark:bg-green-900"
        >
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">
            {realTimeData.presentToday}
          </p>
          <p className="text-sm text-green-600/70 dark:text-green-300/70 mt-2">
            Live Updates
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-yellow-50 dark:bg-yellow-900"
        >
          <h3 className="text-lg font-semibold mb-2">Leave Requests</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            {realTimeData.leaveRequests}
          </p>
          <p className="text-sm text-yellow-600/70 dark:text-yellow-300/70 mt-2">
            Pending approval
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/mark-attendance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📝</div>
              <div>
                <h3 className="text-lg font-semibold">Mark Attendance</h3>
                <p className="text-sm opacity-90">Take attendance for today</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white"
          onClick={handleSendNotification}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📱</div>
            <div>
              <h3 className="text-lg font-semibold">Send Notifications</h3>
              <p className="text-sm opacity-90">Alert absent students</p>
            </div>
          </div>
        </motion.button>

        <Link to="/reports">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="text-lg font-semibold">View Reports</h3>
                <p className="text-sm opacity-90">Analyze attendance data</p>
              </div>
            </div>
          </motion.div>
        </Link>
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
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-field w-36"
            >
              <option value="all">All Classes</option>
              <option value="class10">Class 10</option>
              <option value="class11">Class 11</option>
              <option value="class12">Class 12</option>
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
            <h3 className="text-xl font-semibold">Subject-wise Attendance</h3>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-field w-36"
            >
              <option value="all">All Subjects</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>
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

      {/* Additional Charts and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Performance Distribution</h3>
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
          <h3 className="text-xl font-semibold mb-4">Leave Requests</h3>
          <div className="space-y-4">
            {[
              { student: 'John Doe', date: '2023-11-15', reason: 'Medical appointment' },
              { student: 'Jane Smith', date: '2023-11-16', reason: 'Family event' },
              { student: 'Mike Johnson', date: '2023-11-17', reason: 'Sports competition' },
            ].map((request, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{request.student}</h4>
                  <p className="text-sm text-gray-500">{request.date} - {request.reason}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleApproveLeave(index)}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectLeave(index)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;