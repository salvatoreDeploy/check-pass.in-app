import iconHeader from "../assets/icon-header.svg"
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={iconHeader} alt="Logo da aplicação" />

      <NavLink href="/evento">Eventos</NavLink>
      <NavLink href="/participant">Participantes</NavLink>
    </div>
  );
}
