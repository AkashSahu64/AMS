import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import * as faceDetection from '@tensorflow-models/face-detection';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addRecord } from '../store/slices/attendanceSlice';

const AttendanceMark = () => {
  const [mode, setMode] = useState('face'); // 'face', 'manual', 'thumb'
  const [loading, setLoading] = useState(false);
  const [detector, setDetector] = useState(null);
  const webcamRef = useRef(null);
  const dispatch = useDispatch();

  // Initialize face detector
  const initializeDetector = async () => {
    try {
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
      };
      const detector = await faceDetection.createDetector(model, detectorConfig);
      setDetector(detector);
    } catch (error) {
      console.error('Error initializing face detector:', error);
      toast.error('Failed to initialize face detection');
    }
  };

  // Capture and process image
  const captureImage = useCallback(async () => {
    if (!detector) {
      await initializeDetector();
      return;
    }

    try {
      setLoading(true);
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (!imageSrc) {
        toast.error('Failed to capture image');
        return;
      }

      // Create an image element for face detection
      const img = new Image();
      img.src = imageSrc;
      await img.decode(); // Wait for image to load

      // Detect faces
      const faces = await detector.detectFaces(img);
      
      if (faces.length === 0) {
        toast.error('No face detected. Please try again.');
        return;
      }

      if (faces.length > 1) {
        toast.error('Multiple faces detected. Please ensure only one person is in frame.');
        return;
      }

      // Mock API call to mark attendance
      dispatch(addRecord({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        method: 'face_recognition',
        status: 'present',
      }));

      toast.success('Attendance marked successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
    } finally {
      setLoading(false);
    }
  }, [detector, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Mark Attendance</h1>

        {/* Attendance Mode Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode('face')}
            className={`btn-primary ${mode === 'face' ? 'bg-blue-700' : ''}`}
          >
            Face Recognition
          </button>
          <button
            onClick={() => setMode('thumb')}
            className={`btn-primary ${mode === 'thumb' ? 'bg-blue-700' : ''}`}
          >
            Thumb Impression
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`btn-primary ${mode === 'manual' ? 'bg-blue-700' : ''}`}
          >
            Manual Entry
          </button>
        </div>

        {/* Face Recognition Mode */}
        {mode === 'face' && (
          <div className="card">
            <div className="relative">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
                mirrored={true}
              />
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
            <button
              onClick={captureImage}
              disabled={loading}
              className="btn-primary w-full mt-4"
            >
              {loading ? 'Processing...' : 'Capture & Mark Attendance'}
            </button>
          </div>
        )}

        {/* Thumb Impression Mode */}
        {mode === 'thumb' && (
          <div className="card">
            <div className="text-center py-8">
              <p className="text-gray-600">Thumb impression feature coming soon...</p>
            </div>
          </div>
        )}

        {/* Manual Entry Mode */}
        {mode === 'manual' && (
          <div className="card">
            <div className="text-center py-8">
              <p className="text-gray-600">Manual entry feature coming soon...</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AttendanceMark;