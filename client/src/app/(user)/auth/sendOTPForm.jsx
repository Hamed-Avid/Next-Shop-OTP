import Loading from "@/common/loading";
import TextField from "@/common/textField";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
  return (
    <form className="space-y-10" onSubmit={onSubmit}>
      <TextField
        label="شماره موبایل خود را وارد کنید"
        name="phoneNUmber"
        type="tel"
        value={phoneNumber}
        onChange={onChange}
      />
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            ارسال کد تایید
          </button>
        )}
      </div>
    </form>
  );
}

export default SendOTPForm;
