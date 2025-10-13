// apps/web/components/Navbar.jsx
export default function Navbar({ userName, cartCount }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <img
          src="/assets/imgs/logo.png"
          alt="Atlética Poli USP"
          className="logo-img"
        />
        <span className="brand-name">ATLÉTICA POLI – USP</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 font-semibold text-white drop-shadow-[0_1px_0_rgba(0,0,0,.15)]">
          <span className="text-[18px] translate-y-[-1px]">🛒</span>
          Olá, {userName}
        </span>

        <button
          id="cart-btn"
          className="relative rounded-lg bg-white/10 text-white px-3 py-1"
          aria-label="Abrir carrinho"
        >
          <span className="sr-only">Itens no carrinho</span>
          <span id="cart-count" className="font-bold">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
