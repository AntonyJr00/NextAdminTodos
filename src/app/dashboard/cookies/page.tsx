import { TabBar } from "@components/index";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "SEO Title",
};

export default function CookiesPage() {
  const cookieTab = Number(cookies().get("selectedTab")?.value ?? "1");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold text-gray-600">Tabs</span>
        <TabBar currentTab={cookieTab} />
      </div>
    </div>
  );
}
