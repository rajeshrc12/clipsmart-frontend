import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const Navbar = () => {
  // Access img_url from the Redux store using the useSelector hook
  const imgUrl = useSelector((state) => state.user.img_url); // Assuming user data is in state.user
  return (
    <div className="flex flex-col justify-between items-center shadow-lg h-full px-3 bg-white p-5">
      <div className="font-bold text-2xl">CS</div>
      <Avatar>
        {/* Dynamically set src based on img_url from Redux */}
        <AvatarImage src={imgUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
