import React from "react";
import Navbar from "@/components/shared/Navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from '@/utils/constant';


const Signup = () => {
  const [input, setInput] = React.useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("photo", input.file);
        }

        try {
            
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } 
    }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <form onSubmit={submitHandler} className="border p-5 rounded-md w-120">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          {/* Full Name */}
          <div className="my-2">
            <Label className="my-4">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label className="my-4">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          {/* Phone Number */}
          <div className="my-2">
            <Label className="my-4">Phone Number</Label>
            <Input
              type="number"
              name="phoneNumber"
              placeholder="1234567890"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label className="my-4">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
          </div>

          {/* Profile File */}
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full my-5">
            Sign Up
          </Button>

          {/* Login Link */}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
