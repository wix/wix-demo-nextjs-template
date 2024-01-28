import Link from "next/link";
import { HOME_ROUTE } from "@/app/routes";

const Logo = () => (
  <Link
    href={HOME_ROUTE}
    className="flex md:justify-start md:items-center gap-2 md:px-8 max-md:pt-6"
  >
    <div className="relative">
      <span className="absolute md:right-[25%] md:bottom-[75%] max-md:left-1/2 max-md:-top-1/2 italic">
        Chef
      </span>
    </div>
    <h5 className="relative text-custom-3 italic font-bold text-[24px]">
      <span className="text-3xl italic font-bold">M</span>ichael Bolan<u>o</u>
    </h5>
  </Link>
);

export default Logo;
