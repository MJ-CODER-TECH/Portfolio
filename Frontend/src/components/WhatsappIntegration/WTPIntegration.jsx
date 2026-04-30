import { FloatingWhatsApp } from "react-floating-whatsapp";
import MJProfile from "../../assets/MJCoder.jpg"
export default function App() {
  return (
    <FloatingWhatsApp
      phoneNumber="919146328932"
      accountName="MJ Coder Tech Agency"
      chatMessage="Hi! How can we help you?"
      statusMessage="Typically replies within 1 hour"
     avatar={MJProfile} // 👈 yaha apna image path do

    />
  );
}