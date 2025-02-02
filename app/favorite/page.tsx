import FavoriteCars from "../components/favorite";

export default  function Favorite(){
    return (
        <div className="bg-gray-100 h-screen">
        <FavoriteCars />
        </div>
        
    );
}
export function generateMetadata() {
    return {
      title: "Favorite Cars",
      description: "View all your favorite cars here",
    };
  }