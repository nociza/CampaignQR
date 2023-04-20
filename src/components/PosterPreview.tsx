import React, { useRef, useEffect, useCallback } from "react";
import QRCode from "qrcode.react";
import Draggable from "react-draggable";

interface PosterPreviewProps {
  imageUrl: string;
  qrCodeUrl: string;
  onPosterGenerated: (posterBlob: Blob) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = ({
  imageUrl,
  qrCodeUrl,
  onPosterGenerated,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const generatePoster = useCallback(() => {
    if (!imageRef.current || !qrCodeRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    ctx.drawImage(imageRef.current, 0, 0);

    const qrCodeCanvas = qrCodeRef.current.querySelector("canvas");
    if (!qrCodeCanvas) return;

    ctx.drawImage(
      qrCodeCanvas,
      qrCodeRef.current.offsetLeft,
      qrCodeRef.current.offsetTop
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onPosterGenerated(blob);
      }
    }, "image/png");
  }, [onPosterGenerated]);

  useEffect(() => {
    generatePoster();
  }, [imageUrl, qrCodeUrl, generatePoster]);

  return (
    <div className="relative bg-white p-2 rounded shadow-md">
      <img
        className="w-full h-auto"
        ref={imageRef}
        src={imageUrl}
        alt="Poster preview"
      />
      <Draggable>
        <div
          ref={qrCodeRef}
          className="absolute border-2 border-blue-500 p-1 rounded"
        >
          <QRCode value={qrCodeUrl} />
        </div>
      </Draggable>
    </div>
  );
};

export default PosterPreview;
