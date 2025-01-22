'use client';
import Image from 'next/image';
import { client } from '../../../sanity/lib/client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../navbar';
import { SearchProvider } from '../../context/SearchContext';

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

const fetchCarDetails = async (id: string) => {
  return await client.fetch(
    `*[_type=="car" && _id == $id][0]{
      transmission,
      name,
      "image":image.asset->url,
      type,
      pricePerDay,
      fuelCapacity,
      seatingCapacity,
      tags,
      _id,
      price
    }`,
    { id }
  );
};

export default function BillingPage() {
  const pathname = usePathname();
  const [car, setCar] = useState<any>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setConfirmationMessage('Your car will arrive in 20 to 30 minutes!');
    alert('Keep smiling, it\'s good for your health!');

  };

  useEffect(() => {
    const id = pathname.split('/').pop();
    if (id) {
      fetchCarDetails(id).then(setCar);
    }
  }, [pathname]);

  if (!car) {
    return <Loader />;
  }

  return (
    <>
      <SearchProvider>
        <Navbar />
      </SearchProvider>

      <div className="bg-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Right Column: Rental Summary */}
         {/* Left Column: Billing Info */}
<div className="lg:col-span-2 space-y-8">
  {/* Billing Info */}
  <div className="p-8 bg-white rounded-lg shadow-md">
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Billing Info</h2>
      <p className="text-gray-500">Please enter your billing info</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
      </div>

      {/* Phone Number */}
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          {...register('phone', { required: 'Phone number is required' })}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.phone?.message && <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>}
      </div>

      {/* Address */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          {...register('address', { required: 'Address is required' })}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.address?.message && <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>}
      </div>

      {/* City */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Town / City</label>
        <input
          type="text"
          {...register('city', { required: 'City is required' })}
          className={`mt-1 block w-full px-4 py-2 border ${
            errors.city ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.city?.message && <p className="text-red-500 text-sm mt-1">{errors.city.message as string}</p>}
      </div>

      {/* Rent Now Button */}
      
    </form>
  </div>
</div>

{/* Right Column: Rental Summary */}
<div className="lg:col-span-1 space-y-8">
  <div className="p-6 bg-white rounded-lg shadow-md font-sans">
    <h2 className="text-2xl font-bold mb-2">Rental Summary</h2>
    <p className="text-gray-500 text-sm mb-4">
      Prices may change depending on the length of the rental and the price of your rental car.
    </p>
    <div className="flex items-center mb-4">
      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex items-center justify-center">
        <Image src={car.image} alt={car.name} width={80} height={80} />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold">{car.name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500 text-sm">★★★★☆</span>
          <span className="text-gray-500 text-xs ml-2">440+ Reviewer</span>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>{car.pricePerDay}</span>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold">Total Rental Price</h3>
        <p className="text-gray-500 text-sm mb-1">
          Overall price and includes rental discount
        </p>
        <span className="text-2xl font-bold">{car.pricePerDay}</span>
      </div>
    </div>
  </div>
</div>

            {/* Pickup and Drop-off Info */}
            <div className="p-8 bg-white rounded-lg shadow-md  layout ">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Pickup and Drop-off Info</h2>
                <p className="text-gray-500">Please enter pickup and drop-off locations along with the timing.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Location */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                  <input
                    type="text"
                    {...register('pickupLocation', { required: 'Pickup location is required' })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.pickupLocation?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message as string}</p>
                  )}
                </div>

                {/* Drop-off Location */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Drop-off Location</label>
                  <input
                    type="text"
                    {...register('dropoffLocation', { required: 'Drop-off location is required' })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.dropoffLocation ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.dropoffLocation?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation.message as string}</p>
                  )}
                </div>

                {/* Pickup Time */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                  <input
                    type="datetime-local"
                    {...register('pickupTime', { required: 'Pickup time is required' })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.pickupTime?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message as string}</p>
                  )}
                </div>

                {/* Drop-off Time */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                  <input
                    type="datetime-local"
                    {...register('dropoffTime', { required: 'Drop-off time is required' })}
                    className={`mt-1 block w-full px-4 py-2 border ${
                      errors.dropoffTime ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.dropoffTime?.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.dropoffTime.message as string}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-lg shadow-md hover:bg-blue-700"
                  >
                    Rent Now
                  </button>
                </div>
              </form>
            </div>
            </div>
            

          </div>
        
        {/* Confirmation Message */}
        {confirmationMessage && (
          <div className="mt-6 text-center bg-green-100 text-green-800 py-4 rounded-lg">
            {confirmationMessage}
          </div>
        )}
  
    
    </>
  );
}
