import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = React.useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || "",
    photo: user?.profile?.profilePhoto || "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("fullname", input.name);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phone);
  formData.append("bio", input.bio);
  formData.append("skills", input.skills);

  if (input.resume) {
    formData.append("resume", input.resume);   // Fixed here
  }

  if (input.photo) {
    formData.append("photo", input.photo);
  }

  setLoading(true);
  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/profile/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully");
      console.log(res.data.user);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("Error updating profile");
  } finally {
    setLoading(false);
    setOpen(false);
  }
};


  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[600px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Fill out the form below to update your profile information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="col-span-3 rounded-md border border-gray-300 p-2"
                />
              </div>

              {/* --- Email --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="col-span-3 rounded-md border border-gray-300 p-2"
                />
              </div>

              {/* --- Phone Number --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={input.phone}
                  onChange={handleChange}
                  placeholder="+91 12345 67890"
                  className="col-span-3 rounded-md border border-gray-300 p-2"
                />
              </div>

              {/* --- Bio --- */}
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="bio" className="pt-2 text-right font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={handleChange}
                  placeholder="Tell us a little about yourself..."
                  className="col-span-3 min-h-[100px] rounded-md border border-gray-300 p-2"
                />
              </div>

              {/* --- Skills --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="skills" className="text-right font-medium">
                  Skills
                </label>
                <Input
                  id="skills"
                  name="skills"
                  type="text"
                  value={input.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Tailwind CSS"
                  className="col-span-3 rounded-md border border-gray-300 p-2"
                />
              </div>

              {/* --- Resume --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="resume" className="text-right font-medium">
                  Resume
                </label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={fileChangeHandler}
                  accept=".pdf,.doc,.docx"
                  className="col-span-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-100 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              {/* --- Profile Photo --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="photo" className="text-right font-medium">
                  Profile Photo
                </label>
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setInput((prev) => ({
                      ...prev,
                      photo: file,
                    }));
                  }}
                  accept="image/*"
                  className="col-span-3 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-100 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
