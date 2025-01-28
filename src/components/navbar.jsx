import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className=" flex flex-col justify-between items-center shadow-lg h-full px-3 bg-white p-5">
      <div className="font-bold text-2xl">CS</div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
