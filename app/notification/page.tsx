import NotificationsPage from "../components/notification";

export default function Notification(){
  return(
    <div>
      <NotificationsPage />
    </div>
  )
}
export function generateMetadata() {
  return {
    title: "Notifications",
    description: "View all your notifications here",
  };
}
