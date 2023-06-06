import OTPInput from "react-otp-input";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import Loading from "@/common/loading";

function CheckOTPForm({
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  otpResponse,
  isCheckingOtp,
}) {
  return (
    <div>
      <button onClick={onBack} className="mb-4">
        <HiOutlineArrowNarrowRight className="w-6 h-6 text-secondary-500" />
      </button>
      {otpResponse && (
        <p>
          {otpResponse?.message}
          <button onClick={onBack}>
            <MdEdit className="w-6 h-6 text-primary-900" />
          </button>
        </p>
      )}

      <div className="mb-4">
        {time > 0 ? (
          <p>ثانیه تا ارسال مجدد کد {time}</p>
        ) : (
          <button onClick={onResendOtp}>ارسال مجدد کد?</button>
        )}
      </div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <p>کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input type="number" {...props} />}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
          }}
          containerStyle="flex flex-row-reverse gap-x-4 justify-center"
        />
        <button type="submit" className="btn btn--primary w-full">
          تایید
        </button>
      </form>
      {isCheckingOtp && <Loading />}
    </div>
  );
}

export default CheckOTPForm;
