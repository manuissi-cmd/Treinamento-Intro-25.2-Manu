"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import dynamic from "next/dynamic";
const ValidatedInput = dynamic(() => import("@/components/input/ValidatedInput"));
const RequiredTag = dynamic(() => import("@/components/input/RequiredTag"));
const CredentialsButton = dynamic(() => import("@/components/auth/CredentialsButton"));
const GoogleAuthButton = dynamic(() => import("@/components/auth/GoogleLoginButton"));

import { useAuth } from "@/contexts/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      
      const res = await authClient.signUp.email({
        name: nome || "Usuário",
        email,
        password: senha,
        callbackURL: "/",
      });
      if (res?.error) {
        toast.error(res.error?.message || "Erro ao cadastrar");
        return;
      }
      login(nome || email.split("@")[0] || "Usuário");
      toast.success("Cadastro realizado!");
      router.push("/");
    } catch {
      
      login(nome || email.split("@")[0] || "Usuário");
      toast.success("Cadastro local realizado!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[92%] max-w-[680px]">
      <h2 className="font-extrabold text-[40px] leading-12 text-center text-[#0f172a]">
        Crie sua conta
      </h2>

      
      <div className="mt-6">
        <GoogleAuthButton
          disabled={loading}
          text="Cadastro com Google"
          className="w-full border-2 border-[#0033cc] text-[#0033cc] hover:bg-[#0033cc]/5"
        />
      </div>

      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-300" />
        <p className="text-gray-500 text-sm">ou</p>
        <div className="flex-grow h-0.5 bg-gray-300" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <ValidatedInput
          title="Nome"
          placeholder="Seu nome"
          name="nome"
          type="text"
          value={nome}
          setValue={setNome}
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag />
        </ValidatedInput>

        <ValidatedInput
          title="E-mail"
          placeholder="voce@poli.usp.br"
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
          placeholder="Mínimo 6 caracteres"
          name="password"
          type="password"
          value={senha}
          setValue={setSenha}
          overrideValidate={(v) => v.length >= 6}
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag />
        </ValidatedInput>

        {/* Botão no padrão Atlética: azul + texto amarelo */}
        <CredentialsButton
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#0033cc] hover:bg-[#0026a3] text-[#ffde59] border-0 rounded-lg py-3 font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffde59]/60"
        >
          Cadastrar
        </CredentialsButton>
      </form>

      <p className="mt-6 text-sm">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="text-[#0033cc] border-b border-transparent hover:border-[#0033cc]"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
