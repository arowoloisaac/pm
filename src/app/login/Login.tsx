import { ApiResponse, ApiUrl } from "@/components/Storage/Storage";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { setWithExpiry } from "../../components/backgroundJob/backgroundJob";

const Login = () => {
  const useNavigator = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const data = {
    email: formData.email,
    password: formData.password,
  };

  console.log(data);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const login = (e: any) => {
    e.preventDefault();
    Axios.post<ApiResponse>(`${ApiUrl}/login`, data).then((res) => {
      if (res.status === 200) {
        setWithExpiry("token", res.data.token, 3);
        // localStorage.setItem("token", res.data.token);
        useNavigator("/");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    login;
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@email.com"
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={(e) => handleChange("password", e.target.value)}
                 />
                </div>
              </div>

              <div>
                <button
                  onClick={login}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <Link
                to={"/register"}
                // href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
