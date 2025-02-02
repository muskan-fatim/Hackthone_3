"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
        <p className="mt-4 text-lg text-blue-600 font-semibold">
          Loading, please wait...
        </p>
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

  useEffect(() => {
    const name = localStorage.getItem("productName");
    const price = localStorage.getItem("productPrice");

    if (name) setProductName(name);
    if (price) setProductPrice(parseFloat(price));

    const id = searchParams.get("session_id");
    if (id) {
      setSessionId(id);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/session-details?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.amount) {
          setAmount(data.amount);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200  to-blue-600 text-white">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4 md:mx-auto transform transition-all hover:scale-105">
        {sessionId ? (
          <h1 className="text-3xl font-extrabold mb-6 text-blue-600">
            🎉 Payment Successful!
          </h1>
        ) : (
          <h1 className="text-3xl font-extrabold mb-6 text-blue-600">
            💰 Cash on Delivery
          </h1>
        )}

        <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Order Summary</h2>
          <p className="text-lg text-gray-800 mt-3">
            <strong>Product:</strong> {productName}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Price:</strong> ${productPrice?.toFixed(2)}
          </p>

          {sessionId ? (
            <p className="text-lg text-gray-800 font-semibold mt-3">
              ✅ <strong>Amount Paid:</strong> ${(amount! / 100).toFixed(2)}
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
          className="mt-6 bg-gradient-to-r from-blue-200 to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
