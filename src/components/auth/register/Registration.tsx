"use client";
import { Card } from "@/components/ui/card";
import { Datepicker } from "flowbite-react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ApiResponse, ApiUrl } from "@/components/Storage/Storage";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { setWithExpiry } from "../../backgroundJob/backgroundJob";

export function Registration() {
  const useNavigator = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    password: "",
  });

  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    birthDate: formData.birthDate
      ? formData.birthDate
      : new Date().toISOString().split("T")[0],
    phoneNumber: formData.phoneNumber,
    password: formData.password,
  };

  const [ageError, setAgeError] = useState<string>("");
  const [phoneError, setPhoneError] = useState({
    phoneNumber: "",
  });

  const calculateAge = (birthDate: string): number => {
    const birth = dayjs(birthDate);
    const today = dayjs();
    const age = today.diff(birth, "year");
    return age;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    //htmlFor phone number
    if (field === "phoneNumber") {
      const isValid = /^\+?[1-9]\d{1,14}$/.test(value);
      setPhoneError({
        ...phoneError,
        phoneNumber: isValid ? "" : "Invalid phone number format.",
      });
    }

    if (field === "birthDate") {
      const age = calculateAge(value);
      if (age <= 10) {
        setAgeError("You must be older than 10 years to register.");
      } else {
        setAgeError("");
      }
    }
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.phoneNumber) {
      setPhoneError((prev) => ({
        ...prev,
        phoneNumber: "Phone number is required.",
      }));
      return;
    }

    if (phoneError.phoneNumber) {
      alert("Invalid phone number, edit before submitting!");
    }

    if (ageError) {
      alert("Age not valid, edit errors before submitting!");
    }

    try {
      const response: any = await Axios.post<ApiResponse>(
        `${ApiUrl}/register`,
        data
      );
      if (response.status === 200) {
        setWithExpiry("token", response.data.token, 7);
        useNavigator("/");
        window.location.reload();
      } else {
        alert(response.response.data);
      }
    } catch (error: any) {
      alert(
        error.response.data.title ||
          error.response.data ||
          "Unknown error: check inputs"
      );
    }
  };

  return (
    <>
      <div className="pt-20 px-2">
        <div className="prose p-2 w-screen mx-auto max-w-2xl ">
          <h2>Registration Page</h2>
        </div>
        <Card className="mx-auto max-w-2xl p-9 h-auto">
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  value={formData.firstName}
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  value={formData.lastName}
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Birth Date
                </label>
                <Datepicker
                  value={
                    formData.birthDate
                      ? new Date(formData.birthDate)
                      : new Date()
                  }
                  onChange={(e) => {
                    if (e) {
                      const formattedDate = format(e, "yyyy-MM-dd");
                      handleChange("birthDate", formattedDate);
                    }
                  }}
                  autoHide={true}
                />
                {ageError && <p className="text-red-600 text-sm">{ageError}</p>}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>

                <input
                  type="tel"
                  id="phone"
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  value={formData.phoneNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+79000000000"
                  pattern="^\+?[1-9]\d{1,14}$"
                  required
                  maxLength={14}
                />
                {phoneError.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    Invalid phone number format
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => handleChange("email", e.target.value)}
                value={formData.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
                onChange={(e) => handleChange("password", e.target.value)}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              onClick={register}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
