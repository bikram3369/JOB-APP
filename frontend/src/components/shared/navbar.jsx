import React from "react";
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/popover';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Navbar = () => {
  const {user} = useSelector((state) => state.auth);

  return (
    <div className="bg-white">
      <div className="container mx-auto flex justify-between items-center max-w-7xl h-16 py-4">
        <div>
          <h1 className="text-2xl font-bold">
          <Link to="/">Job<span className="text-[#F83002]">portal</span></Link>  
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to= "/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                Signup
              </Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-3 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Bikram Sarkar</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 gap-2 ">
                    <div className="flex w-fit items-center gap-1 cursor-pointer">
                      <User2 />
                      <Button
                        className="cursor-pointer"
                        variant="link"
                        size="sm"
                      >
                        View Profile
                      </Button>
                    </div>
                    <div className="flex w-fit items-center gap-1 cursor-pointer">
                      <LogOut />
                      <Button
                        className="cursor-pointer"
                        variant="link"
                        size="sm"
                      >
                        LogOut
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;