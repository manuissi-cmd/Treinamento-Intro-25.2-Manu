"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginOptionals from "@/components/auth/LoginOptionals";
import RequiredTag from "@/components/input/RequiredTag";
import toast from "react-hot-toast";

import dynamic from "next/dynamic";
const GoogleAuthButton = dynamic(() => import("@/components/auth/GoogleLoginButton"));
const CredentialsButton = dynamic(() => import("@/components/auth/CredentialsButton"));
const ValidatedInput = dynamic(() => import("@/components/input/ValidatedInput"));

import { useAuth } from "@/contexts/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const displayNameFromEmail = (e: string) => {
    const base = (e || "").split("@")[0]?.trim();
    return base?.length ? base : "Usuário";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(result.error?.message || "Erro desconhecido");
        return;
      }

      login(displayNameFromEmail(email));
      router.push("/");
    } catch (err) {
      // fallback: login local
      toast.success("Entrou como convidado (login local).");
      login(displayNameFromEmail(email));
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    login(displayNameFromEmail(email));
    toast.success("Entrou como convidado.");
    router.push("/");
  };

  if (user) {
    return (
      <div className="lg:w-[90%] xl:w-[80%]">
        <h2 className="font-bold text-[40px] text-center leading-12">
          Continue seu aprendizado
        </h2>
        <div className="mt-6 space-y-4">
          <p className="text-lg">
            Você já está logada como <b>{user.name}</b>.
          </p>
          <div className="flex gap-3">
            <button
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2"
              onClick={logout}
            >
              Sair
            </button>
            <button
              className="border rounded-lg px-4 py-2"
              onClick={() => router.push("/")}
            >
              Ir para a loja
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-[90%] xl:w-[80%]">
      <h2 className="font-bold text-[40px] text-center leading-12">
        Continue seu aprendizado
      </h2>

      <form className="mt-6" onSubmit={handleSubmit}>
        <ValidatedInput
          title="E-mail"
          placeholder="exemplo@noctiluz.com.br"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag />
        </ValidatedInput>

        <ValidatedInput
          title="Senha"
          placeholder="Insira sua senha"
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          overrideValidate={(val) => val.length >= 6}
          containerClassName="mt-4"
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag />
        </ValidatedInput>

        <LoginOptionals />

        {/* Botão de entrar */}
        <CredentialsButton
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#0033cc] hover:bg-[#0026a3] text-[#ffde59] border-0 rounded-lg py-3 font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffde59]/60"
        >
          Entrar
        </CredentialsButton>
      </form>

      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-400" />
        <p className="text-gray-400 text-lg">ou</p>
        <div className="flex-grow h-0.5 bg-gray-400" />
      </div>

      
      <GoogleAuthButton disabled={loading} text="Entrar com Google" />

      <button
        onClick={handleGuest}
        className="mt-4 w-full border rounded-lg py-2 hover:bg-gray-50"
      >
        Entrar como convidado
      </button>

      <Link href="/cadastro" className="block w-fit mt-8 text-sm group">
        Ainda não tem uma conta?{" "}
        <span className="text-[#0033cc] border-b border-transparent group-hover:border-[#0033cc]">
          Cadastre-se
        </span>
      </Link>
    </div>
  );
}
