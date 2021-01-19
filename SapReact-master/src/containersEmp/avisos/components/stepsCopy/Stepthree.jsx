import React, { forwardRef, useState, useEffect } from "react";
import "./Styles.css";
import {
  Button,
  IconButton,
  CustomSelectB,
  CustomInput,
} from "../../../../components";
import { Close } from "@material-ui/icons";
import { LinearProgress, MenuItem } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { regiones } from "../../../../assets/regiones";

const Stepthree = forwardRef((props, ref) => {
  const {
    setStep,
    closeModal,
    jornadaLaboral,
    setJornadaLaboral,
    tipoContrato,
    setTipoContrato,
    cantidadVacantes,
    setCantidadVacantes,
    fechaContratacion,
    setFechaContratacion,
    pais,
    setPais,
    ciudad,
    setCiudad,
    region,
    setRegion,
    dispViajar,
    setDispViajar,
    dispResidencia,
    setDispResidencia,
  } = props;
  const comunas = regiones.find((item) => item.region === region);
  const [errorJLaboral, setErrorJLaboral] = useState(false);
  const [errorTContrato, setErrorTContrato] = useState(false);
  const [errorCVacantes, setErrorCVacantes] = useState(false);
  const [errorFContratacion, setErrorFContratacion] = useState(false);
  const [errorPais, setErrorPais] = useState(false);
  const [errorRegion, setErrorRegion] = useState(false);
  const [errorCiudad, setErrorCiudad] = useState(false);
  const [initDefault, setInitDefault] = useState(true);
  const [_switch, setSwitch] = useState(false);

  const [loading, setLoading] = useState(false);

  const validacion = () => {
    setLoading(true);
    if (jornadaLaboral === "") {
      setErrorJLaboral(true);
    }
    if (tipoContrato === "") {
      setErrorTContrato(true);
    }
    if (cantidadVacantes < 1) {
      setErrorCVacantes(true);
    }
    if (fechaContratacion === null) {
      setErrorFContratacion(true);
    }
    if (pais === "") {
      setErrorPais(true);
    }
    if (region === "") {
      setErrorRegion(true);
    }
    if (ciudad === "") {
      setErrorCiudad(true);
    }

    setInitDefault(false);
    setTimeout(() => {
      setLoading(false);
      setSwitch(!_switch);
    }, 500);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (
        errorJLaboral ||
        errorTContrato ||
        errorCVacantes ||
        errorFContratacion ||
        errorPais ||
        errorRegion ||
        errorCiudad
      ) {
        return;
      } else {
        setStep("four");
      }
    }
  }, [_switch]);
  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>Detalles del Empleo</h1>
        <div style={{ display: "flex", marginBottom: "40px" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Jornada Laboral"
                helpertext="No puede estar vacio"
                error={errorJLaboral}
                value={jornadaLaboral}
                onChange={(e) => {
                  setErrorJLaboral(false);
                  setJornadaLaboral(e.target.value);
                }}
              >
                <MenuItem className="custom-menu-item" value="item1">
                  item1
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item2">
                  item2
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item3">
                  item3
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item4">
                  item4
                </MenuItem>
              </CustomSelectB>
            </div>
            <div className="container-inputs-form-emp">
              <CustomInput
                label="Cantidad de vacantes"
                helpertext="Introduzca un numero valido"
                type="number"
                error={errorCVacantes}
                value={cantidadVacantes}
                onChange={(e) => {
                  setErrorCVacantes(false);
                  setCantidadVacantes(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Tipo de Contrato"
                helpertext="No puede estar vacio"
                error={errorTContrato}
                value={tipoContrato}
                onChange={(e) => {
                  setErrorTContrato(false);
                  setTipoContrato(e.target.value);
                }}
              >
                <MenuItem className="custom-menu-item" value="item1">
                  item1
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item2">
                  item2
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item3">
                  item3
                </MenuItem>
                <MenuItem className="custom-menu-item" value="item4">
                  item4
                </MenuItem>
              </CustomSelectB>
            </div>
            <div className="container-inputs-form-emp">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker
                  error={errorFContratacion}
                  fullWidth
                  size="small"
                  label="Fecha de contratación"
                  minDate={new Date()}
                  maxDate={new Date("2030-01-01")}
                  helperText={
                    errorFContratacion ? "Seleccione una fecha" : null
                  }
                  format="dd/MM/yyyy"
                  value={fechaContratacion}
                  onChange={(newValue) => {
                    setErrorFContratacion(false);
                    setFechaContratacion(newValue);
                  }}
                  InputProps={{
                    className: "input-date-picker-inicio",
                    readOnly: true,
                  }}
                  className="date-picker-inicio"
                  InputLabelProps={{ className: "input-label-date-form" }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
        <p className="p1">Lugar de Trabajo</p>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="País"
                helpertext="Seleccione un país"
                error={errorPais}
                value={pais}
                onChange={(e) => {
                  setErrorPais(false);
                  setPais(e.target.value);
                }}
              >
                <MenuItem className="custom-menu-item" value="Chile">
                  Chile
                </MenuItem>
              </CustomSelectB>
            </div>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Ciudad"
                helpertext="Seleccione una ciudad"
                error={errorCiudad}
                value={ciudad}
                onChange={(e) => {
                  setErrorCiudad(false);
                  setCiudad(e.target.value);
                }}
              >
                {comunas ? (
                  comunas.comunas.map((item, index) => (
                    <MenuItem
                      className="custom-menu-item"
                      key={index}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className="custom-menu-item" value="">
                    Seleccione una región
                  </MenuItem>
                )}
              </CustomSelectB>
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Región"
                helpertext="Seleccione una región"
                error={errorRegion}
                value={region}
                onChange={(e) => {
                  setErrorRegion(false);
                  setRegion(e.target.value);
                }}
              >
                {regiones.map((item, index) => (
                  <MenuItem
                    className="custom-menu-item"
                    key={index}
                    value={item.region}
                  >
                    {item.region}
                  </MenuItem>
                ))}
              </CustomSelectB>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div style={{ flex: 1, paddingRight: "5px" }}>
            <p className="p1">Disponibilidad para Viajar</p>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <button
                className={dispViajar ? "btn-yes-no-active" : "btn-yes-no"}
                onClick={() => setDispViajar(true)}
              >
                Si
              </button>

              <button
                className={!dispViajar ? "btn-yes-no-active" : "btn-yes-no"}
                style={{ marginLeft: "10px" }}
                onClick={() => setDispViajar(false)}
              >
                No
              </button>
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "5px" }}>
            <p className="p1">Disponibilidad cambio de Residencia</p>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <button
                className={dispResidencia ? "btn-yes-no-active" : "btn-yes-no"}
                onClick={() => setDispResidencia(true)}
              >
                Si
              </button>

              <button
                className={!dispResidencia ? "btn-yes-no-active" : "btn-yes-no"}
                style={{ marginLeft: "10px" }}
                onClick={() => setDispResidencia(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="cont-btns-form-emp" style={{ marginTop: "100px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("two")}
          >
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Siguiente
          </Button>
        </div>
      </div>
      <div className="cont-icon-close-formulario">
        <IconButton
          bg="close"
          size="small"
          customcolor="close"
          onClick={closeModal}
        >
          <Close className="icon-close" />
        </IconButton>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default Stepthree;
