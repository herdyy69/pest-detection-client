"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera as CameraPro } from "react-camera-pro";
import { Camera as CameraIcon, Check, X } from "lucide-react";

export const Camera = () => {
  const camera = useRef<any>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  useEffect(() => {
    if (image) {
      const blob = base64ToBlob(image);
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");
      fetch("http://localhost:5001/detect", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [image]);

  const onSaved = (photo: string) => {
    setImage(photo);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-end">
      <CameraPro
        ref={camera}
        errorMessages={{
          noCameraAccessible:
            "No camera device accessible. Please connect your camera or try a different browser.",
          permissionDenied:
            "Permission denied. Please refresh and give camera permission.",
          switchCamera:
            "It is not possible to switch camera to different one because there is only one video device accessible.",
          canvas: "Canvas is not supported.",
        }}
      />
      <button
        onClick={() => {
          if (camera.current) {
            setRawImage(camera.current.takePhoto());
          }
        }}
        className="fixed bottom-4 z-50 bg-white text-black p-4 rounded-full"
      >
        <CameraIcon size={30} />
      </button>
      {rawImage && (
        <div className="fixed p-4 top-0 right-0 z-50">
          <div className="relative w-full h-full shadow-lg border border-white rounded-lg overflow-hidden">
            <img
              src={rawImage || undefined}
              alt="Taken photo"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-1 right-1 flex items-center gap-2">
              <button
                onClick={() => {
                  setRawImage(null);
                }}
                className=" bg-red-500 text-white p-2 border rounded-full"
              >
                <X size={20} />
              </button>
              <button
                onClick={() => {
                  onSaved(rawImage);
                  setRawImage(null);
                }}
                className=" bg-green-500 text-white p-2 border rounded-full"
              >
                <Check size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
