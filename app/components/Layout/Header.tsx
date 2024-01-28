import { CartBag } from "../CartBag/CartBag";
import { NavBar } from "./NavBar/NavBar";
import { Login } from "../Login/Login";
import Logo from "@/app/components/Layout/Logo/Logo";

const Header = () => (
  <header className="h-header z-40 w-full mx-auto px-4 md:px-[100px]">
    <div className="flex gap-[22px] w-full h-header items-center justify-between">
      <div className="md:max-lg:w-full">
        <Logo />
      </div>
      <div className="flex max-lg:order-last grow max-md:justify-end">
        <NavBar />
      </div>
      <div className="hidden justify-end md:flex items-center md:gap-8 max-lg:justify-self-end">
        <CartBag />
        <Login />
      </div>
    </div>
  </header>
);

export default Header;
