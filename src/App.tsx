import React from "react";
import QRCodeGenerator from "./components/QRCodeGenerator";
import "./styles/index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default App;
