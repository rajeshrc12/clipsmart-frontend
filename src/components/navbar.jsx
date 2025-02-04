import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
const Navbar = () => {
  // Access img_url from the Redux store using the useSelector hook
  const user = useSelector((state) => state.user); // Assuming user data is in state.user

  return (
    <div className="flex flex-col justify-between items-center border-r border-[#808080] h-full px-3 p-5">
      <div className="font-bold text-2xl">CS</div>
      <Avatar className="cursor-pointer">
            {/* Dynamically set src based on img_url from Redux */}
            <AvatarImage src={user.imgUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
    </div>
  );
};

export default Navbar;
