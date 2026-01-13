// import React from "react";
// import Navbar from "@/components/shared/Navbar";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Pen, Mail, Contact } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import AppliedJobTable from "@/components/pagecomponents/Profilepagecomponent/AppliedJobTable";
// import UpdateProfileDialog from "@/components/pagecomponents/Profilepagecomponent/UpdateProfileDialog";
// import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = React.useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const isResume = user?.profile?.resume && user?.profile?.resumeOriginalName;
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-24 w-24">
//               <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
//             </Avatar>
//             <div>
//               <h1 className="font-medium text-xl">{user?.fullname}</h1>
//               {/* <p>{user?.profile?.bio}</p> */}
//               <p>{user?.profile?.bio ? user?.profile?.bio : "Bio not added"}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="text-right"
//             variant="outline"
//           >
//             <Pen />
//           </Button>
//         </div>
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail />
//             <span>{user?.email}</span>
//           </div>
//           <div className="flex items-center gap-3 my-2">
//             <Contact />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>
//         <div className="my-5">
//           <h1 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-amber-300 inline-block pb-1">
//             Skills
//           </h1>
//           <div className="flex flex-wrap items-center gap-2">
//             {/* {user?.profile?.skills.length !== 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <Badge key={index}>{item}</Badge>
//               ))
//             ) : (
//               <span className="text-gray-500">NA</span>
//             )} */}
//             {Array.isArray(user?.profile?.skills) &&
//             user.profile.skills.length > 0 ? (
//               user.profile.skills.map((item, index) => (
//                 <Badge key={index}>{item}</Badge>
//               ))
//             ) : (
//               <span className="text-gray-500">NA</span>
//             )}
//           </div>
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-amber-300 inline-block pb-1">
//             Resume
//           </Label>
//           {isResume ? (
//             <a
//               target="blank"
//               href={user?.profile?.resume}
//               className="text-blue-500 w-full hover:underline cursor-pointer"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span>NA</span>
//           )}
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
//         <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
//         {/* Applied Job Table   */}
//         <AppliedJobTable />
//       </div>
//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default profile;

import React from "react";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "@/components/pagecomponents/Profilepagecomponent/AppliedJobTable";
import UpdateProfileDialog from "@/components/pagecomponents/Profilepagecomponent/UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((store) => store.auth);

  // 🔐 Only fetch applied jobs when user exists
  if (user) {
    useGetAppliedJobs();
  }

  // ⏳ Prevent render crash before redux-persist finishes
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto my-10 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  const isResume =
    user.profile?.resume && user.profile?.resumeOriginalName;

  return (
    <div>
      <Navbar />

      {/* PROFILE CARD */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p className="text-gray-600">
                {user.profile?.bio || "Bio not added"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        {/* SKILLS */}
        <div className="my-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-amber-300 inline-block pb-1">
            Skills
          </h1>

          <div className="flex flex-wrap gap-2">
            {user.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* RESUME */}
        <div className="grid w-full max-w-sm gap-1.5">
          <Label className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-amber-300 inline-block pb-1">
            Resume
          </Label>

          {isResume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* APPLIED JOBS */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
