import React from "react";
import Navbar from "@/components/shared/navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";



const Login = () => {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10">
        <form onSubmit={submitHandler} className="border p-5 rounded-md w-120">
          <h1 className="font-bold text-xl mb-5">Login</h1>

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

          {/* Role (static, not connected) */}
          <div className="flex items-center mt-5 my-5">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
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
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          {/* Signup Link */}
          <span className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-800">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
