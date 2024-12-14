import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full p-6 border-b flex items-center gap-2">
          <SidebarTrigger />
          <h2 className="plabs-headline-semibold-24">SakuraCrop Defender</h2>
        </div>
        <div className="p-6">{children}</div>
      </div>
      <Toaster position="top-right" className="lg:w-[370px] 2xl:w-[750px]" />
    </SidebarProvider>
  );
}
