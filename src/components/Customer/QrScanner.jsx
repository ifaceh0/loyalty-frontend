import React, { useEffect, useRef } from "react";

const QrScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }, // Rear camera on mobile
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Sometimes needed on Chrome/Edge for video to render
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("Failed to access camera. Please check permissions.");
        onClose();
      }
    };

    startCamera();

    return () => {
      // Clean up camera on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        className="w-full max-w-md rounded-lg border-4 border-white"
        autoPlay
        muted
        playsInline
      />

      <button
        onClick={onClose}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Close Scanner
      </button>
    </div>
  );
};

export default QrScanner;
