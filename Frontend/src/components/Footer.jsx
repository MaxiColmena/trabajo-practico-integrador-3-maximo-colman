const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-center py-6">
      <p className="text-sm">
        &copy; {currentYear}{" "}
        <span className="text-white font-medium hover:text-red-500 transition">
          COLMAN MAXIMO JAVIER ALEXIS - 2025
        </span>
      </p>
      <p className="text-xs mt-1 text-zinc-500 tracking-wide">
        Trabajo Práctico Integrador II
      </p>
    </footer>
  );
};

export default Footer;