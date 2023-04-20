import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import Draggable from "react-draggable";
import * as saveAs from "file-saver"; // fix me
import PosterPreview from "./PosterPreview";
import DownloadButton from "./DownloadButton";
import Statistics from "./Statistics";

interface QRCodeData {
  id: string;
  url: string;
}

const QRCodeGenerator: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [generatedPosters, setGeneratedPosters] = useState<Blob[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setImageUrl(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetUrl(e.target.value);
  };

  const generateQRCodeLinks = async (n: number) => {
    try {
      const response = await axios.post("/api/generate-links", {
        targetUrl,
        n,
      });
      setQrCodes(response.data.links);
    } catch (error) {
      console.error("Error generating QR code links:", error);
    }
  };

  const downloadPosters = () => {
    generatedPosters.forEach((poster, index) => {
      saveAs(poster, `poster-${index + 1}.png`);
    });
  };

  return (
    <div>
      <input
        className="border border-gray-300 p-2 mb-4 w-full"
        type="file"
        onChange={handleImageUpload}
      />
      <input
        className="border border-gray-300 p-2 mb-4 w-full"
        type="text"
        placeholder="Enter target URL"
        value={targetUrl}
        onChange={handleUrlChange}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
        onClick={() => generateQRCodeLinks(5)}
      >
        Generate QR Codes
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qrCodes.map((qrCodeData, index) => (
          <PosterPreview
            key={qrCodeData.id}
            imageUrl={imageUrl}
            qrCodeUrl={qrCodeData.url}
            onPosterGenerated={(posterBlob: Blob) => {
              setGeneratedPosters((prevPosters) => {
                const updatedPosters = [...prevPosters];
                updatedPosters[index] = posterBlob;
                return updatedPosters;
              });
            }}
          />
        ))}
      </div>
      <DownloadButton
        onClick={downloadPosters}
        disabled={generatedPosters.length !== qrCodes.length}
      />
      <Statistics />
    </div>
  );
};

export default QRCodeGenerator;
