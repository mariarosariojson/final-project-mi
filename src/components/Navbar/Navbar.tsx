import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutButton from "src/components/LogoutButton/LogoutButton";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import type React from "react";

import { useShoppingCart } from "Src/context/ShoppingCartContex";
import { UserContext } from "Src/context/UserContextProvider";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SideBar from "../Sidebar/Sidebar";
import AccountMenu from "../UserMenu/UserMenu";

import NavbarMobile from "./NavbarMobile";

import "src/css/Navbar.css";

interface Props {
  children: React.ReactNode;
}

const links = [
  {
    display: "Hem",
    path: "/Home"
  },
  {
    display: "Maträtter",
    path: "/Food"
  },
  {
    display: "Kontakt",
    path: "/Contact"
  }
];

export default function Navbar({ children }: Props) {
  const { cartQuantity } = useShoppingCart();
  const { userRole } = useContext(UserContext);

  return (
    <>
      <Helmet />
      <nav>
        <div className="navbar">
          <NavbarMobile />
          <div className="nav-links">
            {links.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.display}
              </NavLink>
            ))}
          </div>
          <div className="logotype-nav">
            <img alt="logo" className="logotype" src={fastfood} width="50px" />
            <h5>TBR appen</h5>
            <p>www.tbr-appen.se</p>
          </div>
          <div className="nav-icons">
            <div className="login-register">
              {userRole ? (
                <>
                  <p>Du är inloggad</p>
                  <LogoutButton />
                </>
              ) : (
                <Link to="/">
                  <p>Logga in / Skapa konto</p>
                </Link>
              )}
            </div>
            <div className="nav-icons-container">
              <Link to="/Chef">
                <Button>
                  <i className="bi bi-shop-window nav-icons" />
                </Button>
              </Link>
              {cartQuantity > 0 && (
                <Button>
                  <ShoppingCart />
                  <div className="cart-count">{cartQuantity}</div>
                </Button>
              )}
              <div className="nav-sidebar-icon">
                <SideBar />
              </div>
            </div>
          </div>
        </div>
        <div className="account-menu">
          <AccountMenu />
        </div>
      </nav>
      {children}
    </>
  );
}
