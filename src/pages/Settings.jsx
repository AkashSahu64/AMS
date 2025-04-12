import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    notifications: {
      email: true,
      sms: true,
      whatsapp: false,
    },
    darkMode: false,
  });

  const handleNotificationChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock update settings
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="card">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    checked={formData.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="email-notifications"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sms-notifications"
                    checked={formData.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="sms-notifications"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    SMS Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="whatsapp-notifications"
                    checked={formData.notifications.whatsapp}
                    onChange={() => handleNotificationChange('whatsapp')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="whatsapp-notifications"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    WhatsApp Notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dark-mode"
                  checked={formData.darkMode}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      darkMode: !prev.darkMode,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="dark-mode"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Dark Mode
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary w-full">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;