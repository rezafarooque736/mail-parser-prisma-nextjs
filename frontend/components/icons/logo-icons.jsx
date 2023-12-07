import Image from "next/image";

export default function LogoIcons() {
  return (
    <Image
      src="/railtel_logo.png"
      alt="railtel logo"
      priority
      width={50}
      height={64}
      className="w-[3.12rem] h-[4rem]"
    />
  );
}
