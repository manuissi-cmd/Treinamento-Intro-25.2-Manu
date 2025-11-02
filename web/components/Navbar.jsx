import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Componente de navegação principal do site
export default function Navbar({ userName, cartCount }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo e nome da atlética */}
      <div className="brand">
        <img
          src="/assets/imgs/logo.png"
          alt="Atlética Poli USP"
          className="logo-img"
        />
        <span className="brand-name">ATLÉTICA POLI – USP</span>
      </div>

      {/* Área de interações: nome do usuário, carrinho e login/logout */}
      <div className="flex items-center gap-3">
        {/* "Oi" */}
        <span className="inline-flex items-center gap-2 font-semibold text-white drop-shadow-[0_1px_0_rgba(0,0,0,.15)]">
          <span className="text-[18px] translate-y-[-1px]">🛒</span>
          {user ? `Olá, ${user.name}` : "Olá, Visitante"}
        </span>

        {/* Botão do carrinho com contador */}
        <button
          id="cart-btn"
          className="relative rounded-lg bg-white/10 text-white px-3 py-1"
        >
          <span className="sr-only">Itens no carrinho</span>
          <span id="cart-count" className="font-bold">
            {cartCount}
          </span>
        </button>

        {/* Botão de login ou logout, dependendo de se a pessoa já entrou ou não */}
        {user ? (
          <button
            onClick={logout}
            className="ml-2 rounded-lg bg-white text-blue-700 font-semibold px-3 py-1"
          >
            Sair
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-2 rounded-lg bg-white text-blue-700 font-semibold px-3 py-1"
          >
            Entrar/Cadastrar
          </Link>
        )}
      </div>
    </nav>
  );
}
