"use client";
import React, { useEffect } from "react";

interface ErrBoxProps {
  message: string;
  onClose: () => void;
}

function ErrBox({ message, onClose }: ErrBoxProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="err-box flex items-center justify-center w-fit min-h-[4vh] bg-red-500 absolute top-0 self-center m-4 p-2 rounded-md z-50">
      <p className="text-white text-center">{message}</p>
    </div>
  );
}

export default ErrBox;
