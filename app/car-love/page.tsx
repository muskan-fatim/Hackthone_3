import CarDetails from "../components/love";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CarDetails/>
      
    </div>
  );
}
export function generateMetadata() {
  return {
    title: "Car Love",
    description: "View user  favorite cars here",
  };
}