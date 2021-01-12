import React from "react";
import "./Header.css";
import { Badge } from "@material-ui/core";
import { MailOutline, NotificationsNone } from "@material-ui/icons";
import logo from "../../../resources/images/SAPTalent/ZAPTalent-Logotipo-Horizontal-Blanco.svg";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { open, setOpen } = props;

  // const usuario = useSelector((state) => state.auth.usuario);

  return (
    <div className="container-header-emp">
      <div className="header-left">
        <div className="cont-logo-principal">
          <img src={logo} alt="logo" className="logo-principal" />
        </div>
        <button className="btn-open-sidebar" onClick={() => setOpen(!open)}>
          <div className="icon-bars">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
      <div className="header-right">
        <button className="btn-header-right">
          <div className="icon-bars">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        {/* <div className="cont-logo-user">
          <>
            {usuario.imageURL ? (
              <img
                src={usuario.imageURL}
                alt="logo"
                className="logo-user-db"
              />
            ) : (
              <img
                src={userlogo}
                alt="logo"
                className="logo-user"
              />
            )}
          </>
        </div> */}

        <div className="cont-icon">
          <Badge badgeContent={3} color="error">
            <NotificationsNone className="icon-mail" />
          </Badge>
        </div>
        <div className="cont-icon">
          <Badge badgeContent={4} color="secondary">
            <MailOutline className="icon-mail" />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
