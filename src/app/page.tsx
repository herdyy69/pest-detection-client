import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-6">
      <Image
        src="/logo.png"
        alt="SakuraCrop Defender"
        width={250}
        height={250}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-2 w-[20%]">
        <h1 className="plabs-headline-bold-24 font-semibold text-gray-900">
          Welcome to SakuraCrop Defender
        </h1>
        <p className="plabs-body-regular-16 text-gray-900">
          SakuraCrop Defender is a web application that helps you to detect and
          identify plant diseases using Machine Learning technology.
        </p>
        <Link
          href="/farm-conditions"
          className="plabs-caption-bold-14 text-blue-base underline"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
