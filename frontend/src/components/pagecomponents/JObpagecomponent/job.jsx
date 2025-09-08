import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Job = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md border border-gray-200">
      {/* Top Info: Time + Bookmark */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full p-2 cursor-pointer">
          <Bookmark />
        </Button>
      </div>

      {/* Avatar + Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage
            src="https://imgs.search.brave.com/1BCIAqJm07aDiMCbTlnq6cg3ep11PU6peIRhE5f6lzg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVzaWducnVzaC5j/b20vdXBsb2Fkcy91/c2Vycy9jdXN0b21l/ci0yL2ltYWdlXzE1/MDU5MzI4NDNfN2Fj/NWJmYzAyNWQxYzFl/NTk1NDdkZmNlZjMy/OGUxZDMucG5n"
            alt="Company Logo"
          />
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="font-semibold text-xl mb-2">Senior Software Engineer</h2>

      {/* Job Description */}
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          Part Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button className="bg-[#6A38C2]">
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
