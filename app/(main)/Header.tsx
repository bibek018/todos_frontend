"use client"
import { useAuth } from "@/context/AuthContext";
import api from "../../src/app";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export const Header = () => {
  const {user,setUser,isLoading, logout} = useAuth();
  const router = useRouter();
  const handleLogin=()=>{
    router.push("/login");
  }
  const handleRegister=()=>{
    router.push("/register");
  }
  return(
    user?(<div className="bg-slate-900 w-full px-10 py-5 rounded-3xl ">
      <h2 className="text-blue-400 text-2xl">TODO WORKSPACE</h2>
      <p className="text-4xl font-bold">Welcome back! {user.name}</p>
      <section className="flex flex-row justify-between items-center">
        <p>Keep the track of your tasks, update progress quickly, and stay focused in one clean dasboard</p>
        <section className="flex flex-row gap-4 h-10 justify-center items-center">
          <p className="bg-blue-400 rounded-full px-2 py-1">{user.role}</p>
          <p className="bg-white/20 px-2 py-1 rounded-full">{user.email}</p>
        </section>
      </section>  
      
    </div>) :
  
   ( <div className="bg-slate-900 w-full px-10 py-5 rounded-3xl flex flex-row justify-between items-center  ">
      <section className=" flex flex-col gap-2">
        <h2 className="text-blue-400 text-3xl">TODO WORKSPACE</h2>
       <p className="font-semibold">Keep the track of your tasks, update progress quickly, and stay focused in one clean dasboard</p>
      </section>
      <section className=" flex flex-row gap-4 items-center justify-between pr-4">
      <Button className="bg-white text-black hover:bg-white/50 " onClick={handleLogin} >Login</Button>
      <Button className="bg-white text-black hover:bg-white/50" onClick={handleRegister}>Register</Button>
      </section>
    </div>)
  
  )
    
};

// <div className="bg-slate-900 w-full px-10 py-5 rounded-3xl ">
//       <h2 className="text-blue-400 text-2xl">TODO WORKSPACE</h2>
//       <p className="text-4xl font-bold">Welcome back! {user.name}</p>
//       <section className="flex flex-row justify-between items-center">
//         <p>Keep the track of your tasks, update progress quickly, and stay focused in one clean dasboard</p>
//         <section className="flex flex-row gap-4 h-10 justify-center items-center">
//           <p className="bg-blue-400 rounded-full px-2 py-1">{user.role}</p>
//           <p className="bg-white/20 px-2 py-1 rounded-full">{user.email}</p>
//         </section>
//       </section>
      
//     </div>