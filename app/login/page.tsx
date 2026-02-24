import LeftPanel from "@/app/components/Auth/LeftPanel";
import Header from "@/app/components/Auth/Header";
import Title from "@/app/components/Auth/Title";
import LoginForm from "@/app/components/Auth/LoginForm";
import SocialAuth from "@/app/components/Auth/SocialAuth";
import Footer from "@/app/components/Auth/Footer";

export default function Login() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <LeftPanel />
        <div className="p-10 flex-col">
          <Header />
          <Title />
          <LoginForm />
          <SocialAuth />
          <Footer />
        </div>
      </div>
    </main>
  );
}
