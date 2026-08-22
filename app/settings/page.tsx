import { Logout } from "@/components/settingscomp/Logout";
import { Password } from "@/components/settingscomp/Password";
import { Profile } from "@/components/settingscomp/Profile";
import { SettingHeader } from "@/components/settingscomp/SettingHeader";

export default function SettingHome() {
  return (
    <div className="min-h-screen bg-card/60  text-foreground   md:px-10 md:py-8 lg:px-16 lg:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-md border bg-background p-4 shadow-md sm:p-6 md:gap-6 md:p-8">
        <SettingHeader />
        <Profile />
        <Password />
        <Logout />
      </div>
    </div>
  );
}