import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router";
const Navbar = () => {
  const navigate = useNavigate();
  // Access img_url from the Redux store using the useSelector hook
  const user = useSelector((state) => state.user); // Assuming user data is in state.user
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-between items-center shadow-lg h-full px-3 bg-white p-5">
      <div className="font-bold text-2xl">CS</div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            {/* Dynamically set src based on img_url from Redux */}
            <AvatarImage src={user.imgUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-50">
          <div className="font-bold">{user.name}</div>
          <div onClick={handleLogout} className="cursor-pointer">
            Logout
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
