export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'orderId', type: 'string', title: 'Order ID' },
    { name: 'customerName', type: 'string', title: 'Customer Name' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'address', type: 'string', title: 'Address' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'pickupLocation', type: 'string', title: 'Pickup Location' },
    { name: 'dropoffLocation', type: 'string', title: 'Dropoff Location' },
    { name: 'pickupTime', type: 'datetime', title: 'Pickup Time' },
    { name: 'dropoffTime', type: 'datetime', title: 'Dropoff Time' },
    { name: 'paymentMethod', type: 'string', title: 'Payment Method' },
    { name: 'totalPrice', type: 'number', title: 'Total Price' },
    { name: 'status', type: 'string', title: 'Status' },
    { name: 'createdAt', type: 'datetime', title: 'Created At' },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{ type: 'reference', to: [{ type: 'car' }] }], // Ensure 'car' schema exists
    },
  ],
};
