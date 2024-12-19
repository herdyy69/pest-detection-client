"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera as CameraPro } from "react-camera-pro";
import { Camera as CameraIcon, Check, X, ArrowLeft } from "lucide-react";
import { base64ToBlob } from "@/lib/file";
import { useForm } from "react-hook-form";
import { InsertScans, Scans } from "@/server/_schema/scans";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/ui/form";
import { toast } from "@/components/ui/alert/toast";
import { serviceCreateScans } from "@/server/_services/scans";
import Link from "next/link";

function handleServiceError(error: any) {
  if (error instanceof Error) {
    try {
      const validationErrors = JSON.parse(error.message);
      toast.error({
        title: "Error",
        body: validationErrors[0]?.message || "Failed to create class",
      });
    } catch {
      toast.error({
        title: "Error",
        body: error.message || "An unexpected error occurred.",
      });
    }
  } else {
    toast.error({
      title: "Error",
      body: "An unknown error occurred.",
    });
  }
}

export const Camera = ({ plants }: { plants: any }) => {
  const camera = useRef<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [detecting, setDetecting] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const form = useForm<Scans>({
    defaultValues: {
      image_url_raw: "",
      image_url_processed: "",
    },
    resolver: zodResolver(InsertScans),
  });

  // useEffect(() => {
  //   fetch("/example.jpg")
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = () => {
  //         const base64data = reader.result;
  //         setImage(base64data as string);
  //       };
  //     });
  // }, []);

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

  async function onSave(data: Scans) {
    setLoading(true);

    const detection = detecting?.detections?.map(
      (detection: { label: string; percentage: number }) => {
        return {
          label: detection.label,
          percentage: `${detection.percentage}%`,
        };
      }
    );

    if (!detection || detection.length === 0) {
      toast.error({
        title: "Error",
        body: "No detections found. Please try again.",
      });
      setLoading(false);
      return;
    }

    const prompt = `Cara penanggulangan hama alami untuk data ini: ${JSON.stringify(
      detection
    )}. Tolong response nya jadi tag h1-h6,p,ul,ol,li dan yang lainnya.`;

    try {
      await serviceCreateScans(
        data,
        detecting?.detections,
        "Cara penanggulangan hama alami untuk data"
      );
      toast.success({
        title: "Success",
        body: "Successfully created detection",
      });
      setImage(null);
      setDetecting({});
      form.reset();
    } catch (error: any) {
      setError(error);
      handleServiceError(error);
    }

    setLoading(false);
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <svg
              className="animate-spin h-10 w-10 text-blue-base"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.709 5.709L18.296 8.12A6 6 0 005.88 18.296l2.412-2.412z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="w-screen h-screen flex flex-col items-center justify-end">
        <CameraPro
          ref={camera}
          facingMode="environment"
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
        <Link
          href="/farm-conditions"
          className="fixed top-4 left-4 z-50 hidden lg:flex items-center gap-2 plabs-caption-bold-12 text-blue-base underline bg-white px-4 py-2 rounded-md "
        >
          <ArrowLeft size={16} /> Back to List Farm Conditions
        </Link>
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
          <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[100]" />
            <div className="fixed p-4 top-0 right-0 z-[101]">
              <div className="relative w-full max-w-[350px] max-h-[500px] shadow-lg border border-white rounded-lg overflow-hidden">
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
                        // className="min-w-[150px] md:min-w-[200px]"
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
          </>
        )}
      </div>
    </>
  );
};
