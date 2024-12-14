import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

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
    </SidebarProvider>
  );
}
