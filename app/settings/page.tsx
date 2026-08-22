import { Logout } from "@/components/settingscomp/Logout";
import { Password } from "@/components/settingscomp/Password";
import { Profile } from "@/components/settingscomp/Profile";
import {ArrowLeft} from "lucide-react"
export default function SettingHome() {
  return (
    <div>
      <header>
        <h1><ArrowLeft/>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </header>
      <main>
        <Profile />
        <Password />
      </main>
      <footer>
        <Logout />
      </footer>
    </div>
  );
}
