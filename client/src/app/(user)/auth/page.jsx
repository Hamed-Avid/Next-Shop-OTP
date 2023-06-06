"use client";

import { useEffect, useState } from "react";
import SendOTPForm from "./sendOTPForm";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOTP } from "@/services/authServices";
import CheckOTPForm from "./checkOTPForm";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();
  const {
    data: otpResponse,
    isLoading,
    mutateAsync: mutateAsyncGetOtp,
  } = useMutation({
    mutationFn: getOTP,
  });
  const { mutateAsync: mutateAsyncCheckOtp, isLoading: isCheckingOtp } =
    useMutation({
      mutationFn: checkOtp,
    });

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsyncGetOtp(phoneNumber);
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateAsyncCheckOtp({ phoneNumber, otp });
      toast.success(message);
      user.isActive ? router.push("/") : router.push("/complete-profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onSubmit={checkOtpHandler}
            otp={otp}
            setOtp={setOtp}
            onBack={() => setStep(step - 1)}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex justify-center mt-8">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </main>
  );
}

export default AuthPage;
