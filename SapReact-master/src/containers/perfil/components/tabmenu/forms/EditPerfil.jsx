import React, { useState } from "react";
import "./Forms.css";
import { IconButton, ListItem, MenuItem } from "@material-ui/core";
import {
  Edit,
  AccountCircle,
  Fingerprint,
  MailOutline,
  Group,
  Flag,
} from "@material-ui/icons";
import { CustomInput, CustomSelectB, Tooltip } from "../../../../../components";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import validator from "validator";

const EditPerfil = ({ usuario, loading }) => {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(true);
  const [nombres, setNombres] = useState(usuario ? usuario.nombres : null);
  const [apellidos, setApellidos] = useState(
    usuario ? usuario.apellidos : null
  );
  const [rut, setRut] = useState(usuario ? usuario.rut : null);
  const [email, setEmail] = useState(usuario ? usuario.email : null);
  const [ecivil, setEcivil] = useState(usuario ? usuario.ecivil : null);
  const [nacion, setNacion] = useState(usuario ? usuario.nacion : null);
  const [_id] = useState(usuario ? usuario._id : null);
  const [rutmsg, setRutMsg] = useState("");
  const [rutError, setRutError] = useState(false);
  const [nacionerror, setErrorNacion] = useState(false);
  const [errornombre, setErrorNombre] = useState(false);
  const [errorapellido, setErrorApellido] = useState(false);
  const [erroremail, setErrorEmail] = useState(false);
  const [emailmsg, setEmailMsg] = useState("");
  const [nombresmsg, setNombresMsg] = useState("");
  const [apellidosmsg, setApellidosMsg] = useState("");
  const [nacionmsg, setNacionMsg] = useState("");
  const [consultor, setConsultor] = useState(
    usuario ? usuario.consultor : null
  );
  const formatRut2 = () => {
    document.getElementById("input-rut-ed").value = rut;
  };
  const pattern = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const pattern2 = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const pattern3 = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const handleClick = () => {
    //validacion rut

    const rutvalidado = validateRut(rut);
    if (rut.trim() === "") {
      setRutMsg("Rut no puede estar vacio");
      setRutError(true);
      return;
    } else if (rutvalidado === false) {
      setRutMsg("El rut no es valido");
      setRutError(true);
      return;
    }
    //validacion nombre
    if (nombres.trim() === "") {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede estar vacio");
      return;
    } else if (pattern.test(nombres.trim()) === false) {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede contener numeros");
      return;
    }
    //validacion apellido
    if (apellidos.trim() === "") {
      setErrorApellido(true);
      setApellidosMsg(`Apellidos no puede estar vacio`);
      return;
    } else if (pattern2.test(apellidos.trim()) === false) {
      setErrorApellido(true);
      setApellidosMsg(`Apellidos no puede contener numeros`);
      return;
    }
    //validar email
    const emailv = validator.isEmail(email);
    if (email.trim() === "") {
      setErrorEmail(true);
      setEmailMsg("Email no puede estar vacio");
      return;
    } else if (emailv === false) {
      setErrorEmail(true);
      setEmailMsg("El formato de email es erroneo");
      return;
    }
    //validacion nacionalidad
    if (nacion.trim() === "") {
      setErrorNacion(true);
      setNacionMsg("Nación no puede estar vacio");
      return;
    } else if (pattern3.test(nacion.trim()) === false) {
      setErrorNacion(true);
      setNacionMsg("Nación no puede contener numeros");
      return;
    }

    dispatch(
      editarUsuarioAction({
        _id,
        rut,
        nombres,
        apellidos,
        email,
        ecivil,
        nacion,
        consultor,
      })
    );
    setEditar(true);
  };

  const changeRut = (e) => {
    if (rutError === true) {
      setRutError(false);
    }
    setRut(formatRut(e.target.value, RutFormat.DOTS_DASH));
  };

  const resetForm = () => {
    setNombres(usuario ? usuario.nombres : null);
    setApellidos(usuario ? usuario.apellidos : null);
    setRut(usuario ? usuario.rut : null);
    setEmail(usuario ? usuario.email : null);
    setEcivil(usuario ? usuario.ecivil : null);
    setNacion(usuario ? usuario.nacion : null);
    setRutError(false);
    setErrorNacion(false);
    setErrorNombre(false);
    setErrorApellido(false);
    setErrorEmail(false);
  };

  return (
    <>
      <div style={{ position: "relative", height: "470px" }}>
        <div className="top-edit-perfil-2">
          <p>Editar perfil</p>
          <Tooltip title="Editar">
            <IconButton
              className={
                !editar || loading
                  ? "icon-btn-edit-perfil-inact"
                  : "icon-btn-edit-perfil"
              }
              onClick={() => setEditar(!editar)}
              disabled={!editar || loading}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
        <div className="form-edit-perfil">
          <div className="item-edit-perfil" style={{ marginBottom: "20px" }}>
            <AccountCircle className="icon-form-edit-perfil" />
            <p className="p-tipo-consultor-edit-perfil">Tipo Consultor</p>
            <div className="tipo-consultor-edit-perfil">
              <div
                className={consultor === "Training" ? "tc-active" : null}
                onClick={() => setConsultor("Training")}
              >
                <p>Training</p>
              </div>
              <div
                className={consultor === "Junior" ? "tc-active" : null}
                onClick={() => setConsultor("Junior")}
              >
                <p>Junior</p>
              </div>
              <div
                className={consultor === "Semi Senior" ? "tc-active" : null}
                onClick={() => setConsultor("Semi Senior")}
              >
                <p>Semi Senior</p>
              </div>
              <div
                className={consultor === "Senior" ? "tc-active" : null}
                onClick={() => setConsultor("Senior")}
              >
                <p>Senior</p>
              </div>
            </div>
          </div>
          <div className="item-edit-perfil">
            <AccountCircle className="icon-form-edit-perfil" />
            <CustomInput
              label="Nombres"
              defaultValue={nombres}
              value={nombres}
              onChange={(e) => {
                setErrorNombre(false);
                setNombres(e.target.value);
              }}
              error={errornombre}
              helpertext={nombresmsg}
              name="names"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <AccountCircle className="icon-form-edit-perfil" />
            <CustomInput
              label="Apellidos"
              defaultValue={apellidos}
              value={apellidos}
              onChange={(e) => {
                setErrorApellido(false);
                setApellidos(e.target.value);
              }}
              error={errorapellido}
              helpertext={apellidosmsg}
              name="last-names"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <Fingerprint className="icon-form-edit-perfil" />
            <CustomInput
              label="Rut"
              defaultValue={rut}
              value={rut}
              onChange={changeRut}
              onBlur={formatRut2}
              id="input-rut-ed"
              error={rutError}
              helpertext={rutmsg}
              name="names"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <MailOutline className="icon-form-edit-perfil" />
            <CustomInput
              label="Email"
              defaultValue={email}
              onChange={(e) => {
                setErrorEmail(false);
                setEmail(e.target.value);
              }}
              error={erroremail}
              value={email}
              helpertext={emailmsg}
              name="email"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <Group className="icon-form-edit-perfil" />
            <CustomSelectB
              label="Estado civil"
              defaultValue={ecivil}
              value={ecivil}
              onChange={(e) => setEcivil(e.target.value)}
              disabled={editar}
            >
              <MenuItem value="Soltero" className="custom-menu-item">
                Soltero
              </MenuItem>
              <MenuItem value="Casado" className="custom-menu-item">
                Casado
              </MenuItem>
              <MenuItem value="Divorciado" className="custom-menu-item">
                Divorciado
              </MenuItem>
            </CustomSelectB>
          </div>
          <div className="item-edit-perfil">
            <Flag className="icon-form-edit-perfil" />

            <CustomSelectB
              error={nacionerror}
              label="Nacionalidad"
              defaultValue={nacion}
              value={nacion}
              onChange={(e) => {
                setErrorNacion(false);
                setNacion(e.target.value);
              }}
              name="nation"
              disabled={editar}
            >
              <MenuItem className="custom-menu-item" value="Chileno">
                Chileno
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Argentino">
                Argentino
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Peruano">
                Peruano
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Boliviano">
                Boliviano
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Brazileño">
                Brazileño
              </MenuItem>
            </CustomSelectB>
          </div>
        </div>
        <div className="cont-btn-edit-perfil">
          <ListItem
            button
            disabled={editar}
            className="btn-adnzap-modal"
            onClick={() => {
              resetForm();
              setEditar(!editar);
            }}
          >
            <p style={{ color: "white" }}>Cancelar</p>
          </ListItem>
          <ListItem
            disabled={editar}
            button
            className="btn-adnzap-modal"
            onClick={() => handleClick()}
          >
            <p style={{ color: "white" }}>Guardar</p>
          </ListItem>
        </div>
      </div>
    </>
  );
};

export default EditPerfil;
