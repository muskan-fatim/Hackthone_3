"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
        <p className="mt-4 text-lg text-blue-600 font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
}

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | null>(null);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setProductName(localStorage.getItem("productName"));
    setProductPrice(parseFloat(localStorage.getItem("productPrice") || "0"));

    const id = searchParams.get("session_id");
    if (id) {
      setSessionId(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/session-details?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.amount) setAmount(data.amount);
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-4 relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-lg w-full transform transition-all hover:scale-105">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold mb-6 text-blue-700">
          {sessionId ? "🎉 Payment Successful!" : "💰 Cash on Delivery"}
        </motion.h1>

        <div className="bg-blue-100 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Order Summary</h2>
          <p className="text-lg text-gray-800 mt-3">
            <strong>Product:</strong> {productName || "N/A"}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Price:</strong> ${productPrice?.toFixed(2)}
          </p>

          {sessionId ? (
            <p className="text-lg text-gray-800 font-semibold mt-3">
              ✅ <strong>Amount Paid:</strong> ${amount?.toFixed(2) || productPrice?.toFixed(2)}
              <br />
              🚗 <b>Your car will arrive soon!</b>
            </p>
          ) : (
            <p className="text-lg text-gray-800 font-semibold mt-3">
              🚛 <b>Get ready to pay on delivery!</b>
            </p>
          )}
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Back to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
