import { HiEye } from "react-icons/hi";
import { BsEnvelope } from "react-icons/bs";
import { FiShieldOff } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminLoginMutation } from "@/store/api/index";
import router from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { setAccessToken } from "@/store/auth/authSlice";
import Head from "next/head";
import { ClipLoader } from "react-spinners";

const Login: React.FC = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await adminLogin({
        username: username,
        password: password,
      }).unwrap();
      dispatch(setAccessToken(response.value));
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl">
        {/* Top Section for mobile device only */}
        <div className="w-full md:hidden">
          <Image
            src="/images/admin/admin-login.png"
            alt="Admin Image"
            width={600}
            height={600}
            objectFit="cover"
          />
        </div>
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 overflow-auto">
          <div className="text-left">
            <h1 className="text-3xl font-bold mb-1">Login to your account</h1>
            <p className="text-gray-400 mb-12">Welcome back!</p>
          </div>
          <form className="w-full md:w-[70%]" onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <div className="absolute top-2 left-2">
                <BsEnvelope className="text-gray-400" size={24} />
              </div>
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <div className="absolute top-2 left-2">
                <FiShieldOff className="text-gray-400" size={24} />
              </div>
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <HiEye className="text-gray-400" size={20} />
                ) : (
                  <BsEyeSlash className="text-gray-400" size={20} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-8 rounded-lg transition-colors w-full"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={20} color="white" /> : "Login"}
            </button>
          </form>
        </div>
        {/* Right Section */}
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/images/admin/admin-login.png"
            alt="Admin Image"
            width={600}
            height={600}
            objectFit="cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
