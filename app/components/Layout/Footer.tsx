import "./footer.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="w-full leading-7 text-center border-t pt-[32px]">
    <h2 className="text-2xl sm:text-xl font-bold">#ChefMichaelBolano</h2>
    <p className="mt-4 mb-5 text-xs sm:text-base">
      Tel: 123-456-7890 | Email: info@mysite.com
    </p>
    <Link href="" className="mx-auto block w-fit">
      <Image
        alt="back to top arrow"
        width={44}
        height={44}
        src="/back-to-top.png"
        className="mx-auto"
      />
      Back to Top
    </Link>
    <div className="mt-4 h-[50px] leading-[50px] bg-custom-1 text-center text-custom-2 text-sm">
      © 2035 by Michael Bolano. Powered and secured by{" "}
      <Link href="https://www.wix.com">Wix</Link>
    </div>
  </footer>
);

export default Footer;
