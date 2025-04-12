import * as faceDetection from '@tensorflow-models/face-detection';

export const loadFaceDetector = async () => {
  try {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    };
    return await faceDetection.createDetector(model, detectorConfig);
  } catch (error) {
    console.error('Error loading face detector:', error);
    throw error;
  }
};

export const detectFaces = async (detector, imageElement) => {
  try {
    return await detector.detectFaces(imageElement);
  } catch (error) {
    console.error('Error detecting faces:', error);
    throw error;
  }
};