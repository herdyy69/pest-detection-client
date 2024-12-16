"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera as CameraPro } from "react-camera-pro";
import { Camera as CameraIcon, Check, X } from "lucide-react";
import { base64ToBlob } from "@/lib/file";
import { useForm } from "react-hook-form";
import { InsertScans, Scans } from "@/server/_schema/scans";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/ui/form";
import { toast } from "@/components/ui/alert/toast";
import { serviceCreateScans } from "@/server/_services/scans";

export const Camera = ({ plants }: { plants: any }) => {
  const camera = useRef<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [detecting, setDetecting] = useState<any>({});

  const form = useForm<Scans>({
    defaultValues: {
      image_url_raw: "",
      image_url_processed: "",
    },
    resolver: zodResolver(InsertScans),
  });

  useEffect(() => {
    if (image) {
      const blob = base64ToBlob(image);
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");
      fetch(process.env.NEXT_PUBLIC_API_URL + "/detect", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setDetecting(data);
          form.setValue("image_url_processed", data.image_path);
        });
    }
  }, [image]);

  async function onSave(data: any) {
    try {
      await serviceCreateScans(data, detecting?.detections).then(() => {
        toast.success({
          title: "Success",
          body: "Successfully created detection",
        });
        setImage(null);
        setDetecting({});
        form.reset();
      });
    } catch (error) {
      if (error instanceof Error) {
        const validationErrors = JSON.parse(error.message);
        toast.error({
          title: "Error",
          body: validationErrors[0].message || "Failed to create class",
        });
      }
    }
  }

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
            setImage(camera.current.takePhoto());
          }
        }}
        className="fixed bottom-4 z-50 bg-white text-black p-4 rounded-full"
      >
        <CameraIcon size={30} />
      </button>
      {image && (
        <div className="fixed p-4 top-0 right-0 z-50">
          <div className="relative w-full h-full shadow-lg border border-white rounded-lg overflow-hidden">
            <img
              src={
                (detecting?.detections?.length > 0 &&
                  process.env.NEXT_PUBLIC_API_URL +
                    "/" +
                    detecting.image_path) ||
                image
              }
              alt="Taken photo"
              className="object-cover w-full h-full"
            />
            <Form form={form} onSave={onSave}>
              {detecting?.detections?.length > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <Form.Select
                    className="w-[150px] md:w-[200px]"
                    placeholder="Select plant"
                    name="plant_id"
                    options={plants.data.map((plant: any) => {
                      return {
                        value: plant.id,
                        label: plant.name,
                      };
                    })}
                  />
                </div>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <Form.Button
                  onClick={() => {
                    setImage(null);
                    setDetecting({});
                    form.reset();
                  }}
                  className=" bg-red-500 text-white p-2 border rounded-full"
                  type="button"
                >
                  <X size={20} />
                </Form.Button>
                {detecting?.detections?.length > 0 && (
                  <Form.Button
                    className=" bg-green-500 text-white p-2 border rounded-full"
                    type="submit"
                  >
                    <Check size={20} />
                  </Form.Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
