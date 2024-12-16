import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "sonner";
import { Camera } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
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
