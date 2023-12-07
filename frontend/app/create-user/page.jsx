import SignUpForm from "@/components/auth-components/signup-form";

const page = () => {
  return (
    <div className="px-10 py-6 mt-24 rounded-md bg-slate-100 w-96">
      <div className="flex flex-col w-full pb-2">
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
