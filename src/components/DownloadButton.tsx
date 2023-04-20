import React from "react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`bg-green-500    ${
        disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
      }
      text-white p-2 rounded mt-4 w-full`}
      onClick={onClick}
      disabled={disabled}
    >
      Download Posters
    </button>
  );
};

export default DownloadButton;
