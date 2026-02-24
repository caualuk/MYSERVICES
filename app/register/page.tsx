import Footer from "./Footer";
import HeaderRegister from "./Header";
import RegisterForm from "./RegisterForm";
import RightPanel from "./RightPanel";
import SocialAuth from "./SocialAuth";
import Title from "./Title";

export default function Register() {
  return (
    <main className=" min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10 flex-col justify-start">
          <HeaderRegister />
          <Title />
          <RegisterForm />
          {/* <SocialAuth /> LOGIN COM GOOGLE E APPLE AINDA NÃO FUNCIONA, VOU DEIXAR PRA IMPLEMENTAR DEPOIS */}
          <Footer />
        </div>
        <RightPanel />
      </div>
    </main>
  );
}
