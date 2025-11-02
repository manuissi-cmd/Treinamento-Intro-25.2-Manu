
import Image from "next/image";
import CadastroForm from "./CadastroForm"; 

export default function CadastroPage() {
  return (
    <main className="lg:h-screen flex">
      {/* Coluna do negocio la de colocar email */}
      <div className="w-full lg:w-[55%] h-full flex flex-col gap-8 items-center justify-center bg-yellow-100">
        <CadastroForm />
      </div>

      {/* Coluna da marca */}
      <div className="hidden lg:flex h-full w-[45%] flex-col items-center justify-center bg-[#0033cc] text-yellow-300">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/imgs/logo.png"
            alt="Atlética Poli USP"
            width={180}
            height={180}
            className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
          />
          <h1 className="font-bold text-[48px] mt-6 text-yellow-300 text-center">
            ATLÉTICA POLI – USP
          </h1>
        </div>
      </div>
    </main>
  );
}
