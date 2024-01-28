"use client";
import dynamic from "next/dynamic";
import { useUI } from "../Provider/context";
import { User } from "@wix/wix-ui-icons-common";

const LoginComp = () => {
  const { openModalLogin } = useUI();
  const onLoginClick = async () => {
    openModalLogin();
  };
  return (
    <button
      onClick={onLoginClick}
      className="flex relative min-w-[72px] gap-1 font-roboto font-normal items-center"
    >
      <User size={24} stroke="currentColor" />
      Log In
    </button>
  );
};

export const Login = dynamic(() => Promise.resolve(LoginComp), {
  ssr: false,
});
