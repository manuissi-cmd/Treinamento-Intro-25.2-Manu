import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="lg:h-screen flex">
      {/* Coluna do formulário */}
      <div className="w-[55%] h-full flex flex-col gap-8 items-center justify-center bg-yellow-100">
        <LoginForm />
      </div>

      {/* Coluna da logo */}
      <div className="h-full w-[45%] flex flex-col items-center justify-center bg-[#0033cc] text-yellow-300">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/imgs/logo.png"
            alt="Atlética Poli USP"
            width={180}
            height={180}
            className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
          />
          <h1 className="font-bold text-[48px] mt-6 text-yellow-300">
            ATLÉTICA POLI – USP
          </h1>
        </div>
      </div>
    </main>
  );
}
