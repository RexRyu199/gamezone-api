import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/user";

export function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues) => {
      try {
        const { confirmPassword, ...data } = formValues;
        await registerApi(data);
        toast.success("Cuenta creada. Ya puedes iniciar sesión.");
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Crear cuenta</h1>

        <Form onSubmit={formik.handleSubmit}>
          <label>Usuario</label>
          <Form.Input
            name="username"
            placeholder="Usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username}
          />

          <label>Correo electrónico</label>
          <Form.Input
            name="email"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <label>Gamertag (opcional)</label>
          <Form.Input
            name="gamertag"
            placeholder="Tu nombre de jugador"
            value={formik.values.gamertag}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gamertag && formik.errors.gamertag}
          />

          <label>Contraseña</label>
          <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            autoComplete="new-password"
          />

          <label>Confirmar contraseña</label>
          <Form.Input
            name="confirmPassword"
            type="password"
            placeholder="Repite la contraseña"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button type="submit" content="Registrarme" primary fluid />
        </Form>

        <p className="login-admin__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

function initialValues() {
  return {
    username: "",
    email: "",
    gamertag: "",
    password: "",
    confirmPassword: "",
  };
}

function validationSchema() {
  return Yup.object({
    username: Yup.string()
      .min(3, "Mínimo 3 caracteres")
      .required("El usuario es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    gamertag: Yup.string().max(30, "Máximo 30 caracteres"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .matches(/\d/, "Debe incluir al menos un número")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Confirma la contraseña"),
  });
}