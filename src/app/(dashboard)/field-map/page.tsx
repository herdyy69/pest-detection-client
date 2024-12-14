import React from "react";
import { Modal } from "./modal";

export default function Page() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
        Field Map
      </h1>
      <Modal />
    </div>
  );
}
