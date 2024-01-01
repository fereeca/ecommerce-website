import Navbar from "#views/Navbar/navbar";
import { ReactNode } from "react";
import "./container.css";

interface ContainerInterface {
  children: ReactNode;
}

function Container({ children }: ContainerInterface) {
  return (
    <>
      <div className="nav-prod">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="prod">{children}</div>
      </div>
    </>
  );
}

export default Container;
