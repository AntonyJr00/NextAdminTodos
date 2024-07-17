// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { TopMenu, Sidebar } from "@components/index";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="p-6 pb-4 bg-slate-300 m-2 rounded-lg">{children}</div>
      </div>
    </>
  );
}
