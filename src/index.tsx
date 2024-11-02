import { QRCodeSVG } from "qrcode.react";

export default function LandingPage() {
  const whatsappUrl = "https://wa.me/19296847458?text=Hello%20there!%20I%20have%20a%20question%20about%20your%20services.%20Identifier:%20form%23321";


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">New LLM</h1>
        <p className="text-xl mb-8 text-gray-600">
          For surveys and research questions
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <QRCodeSVG
            value={whatsappUrl}
            size={200}
            className="mx-auto"
            aria-label="QR Code to access SurveyBot AI on WhatsApp"
          />
          <p className="mt-4 text-sm text-gray-500">Scan to chat on WhatsApp</p>
        </div>
      </main>
    </div>
  );
}
