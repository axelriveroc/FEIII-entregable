
import { useFormik } from "formik";
import * as Yup from 'yup'
import Card from "./Card";
import { useState } from "react";

const getInitialValues = ()=> ({
    email: "", 
    password: "",
    country: "",
    acceptTerms: false ,
    gender: "",
    dateOfBirth: ""
})

function App() {

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Femenino", value: "femenino" },
    { label: "Otro", value: "otro" }
  ];

  const countries = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "mexico", label: "Mexico" }
  ];

  const [submittedValues, setSubmittedValues] = useState(null);
  const REGULAR_EXP = /^[a-zA-Z0-9_-]{6,12}$/

  const getValidationSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: Yup.string()
          .email("tipo de email incorrecto")
          .required("Campo Obligatorio"),
        country: Yup.mixed().required("Campo Obligatorio"),
        acceptTerms: Yup.boolean().oneOf(
          [true],
          "Debes aceptar los términos y condiciones"
        ),
        gender: Yup.mixed().required("Campo Obligatorio"),
        dateOfBirth: Yup.date()
          .required("Campo Obligatorio")
          .nullable()
          .min(new Date(1955, 0, 1), "Fecha invalida, debe ser de 1955 en adelante.")
          .max(new Date(), "La fecha de nacimiento no puede ser en el futuro"),
        password: Yup.string()
          .min(6, "La contraseña debe tener al menos 6 caracteres")
          .max(12, "La contraseña no debe superar los 12 caracteres")
          .required("Campo Obligatorio")
          .matches(
            REGULAR_EXP,
            "La contraseña debe tener al menos 6 caracteres, y puede tener un carácter especial"
          ),
      })
    );

  const { handleSubmit, values, setFieldValue, errors, isSubmitting, status, handleBlur, touched } = useFormik({

    validateOnBlur: true,
    validateOnChange: false,
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit: (values, {setSubmitting, setStatus, resetForm}) => {
      setSubmitting(true); // Establecer isSubmitting en true para indicar que el envío está en progreso
      setStatus('inicio')
      setTimeout(() => {
        if (Object.keys(errors).length === 0) {
         
          setSubmittedValues({ ...values, dateOfBirth: values.dateOfBirth.toLocaleDateString() });
          // Restablecer los valores de los inputs solo si no hay errores
          setFieldValue("password", "");
          setFieldValue("email", "");
          setFieldValue("country", "");
          setFieldValue("gender", "");
          setFieldValue("acceptTerms", false);
        }
        // Establecer el estado como 'success' para indicar que el formulario se ha enviado con éxito después de un breve retraso
        setTimeout(() => {
          setStatus('success');// Establecer el estado como 'success' para indicar que el formulario se ha enviado con éxito
        }, 200);
        setSubmitting(false); // Establecer isSubmitting en false para indicar que el envío ha finalizado
      }, 3000);
      console.log(values)
    },
  });

  return (
    <div className="App">
      <h1> </h1>
      <form className="flex-col form" onSubmit={handleSubmit}>
        <h2> Formulario de prueba </h2>
        <input
          type="text"
          placeholder="Ingresa tu email"
          name="email"
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}
        <input
          type="text"
          placeholder="Ingresa tu password"
          name="password"
          value={values.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

        <select
          name="country"
          value={values.country}
          onChange={(e) => setFieldValue("country", e.target.value)}
          onBlur={handleBlur}
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        {touched.country && errors.country && (
          <p style={{ color: "red" }}>{errors.country}</p>
        )}

        <div>
          {genderOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="gender"
                value={option.value}
                checked={values.gender === option.value}
                onChange={(e) => setFieldValue("gender", e.target.value)}
                onBlur={handleBlur}
              />
              {option.label}
            </label>
          ))}
          {touched.gender && errors.gender && (
            <p style={{ color: "red" }}>{errors.gender}</p>
          )}
        </div>

        <input
          type="date"
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={(e) => setFieldValue("dateOfBirth", e.target.value)}
          onBlur={handleBlur}
        />
        {touched.dateOfBirth && errors.dateOfBirth && (
          <p style={{ color: "red" }}>{errors.dateOfBirth}</p>
        )}

        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={() => setFieldValue("acceptTerms", !values.acceptTerms)}
            onBlur={handleBlur}
          />
          Acepto los términos y condiciones
        </label>
        {touched.acceptTerms && errors.acceptTerms && (
          <p style={{ color: "red" }}>{errors.acceptTerms}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          Enviar
        </button>

        {isSubmitting && <p>Enviando formulario...</p>}
        {status === "success" && (
          <p style={{ color: "green" }}>
            ¡El formulario se ha enviado con éxito!
          </p>
        )}

        {status === "success" && <Card values={submittedValues} />}
      </form>
    </div>
  );
}

export default App;
