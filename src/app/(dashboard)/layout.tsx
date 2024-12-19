import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "sonner";
import { Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SakuraCrop Defender"
              width={40}
              height={40}
              className="rounded"
            />
            <h2 className="plabs-headline-semibold-24">SakuraCrop Defender</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/scan"
              className="plabs-caption-bold-14 flex items-center gap-2 btn btn-outline-greyscale"
            >
              <Camera /> Take a Picture
            </Link>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
      <Toaster position="top-right" className="lg:w-[370px] 2xl:w-[750px]" />
    </SidebarProvider>
  );
}
