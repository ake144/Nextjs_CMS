import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex items-center justify-center p-5 m-6"><SignUp path="/sign-up" /></div>;
}