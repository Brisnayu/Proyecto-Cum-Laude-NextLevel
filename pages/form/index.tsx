import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/pages/form/indexForm.module.css";
import ButtonSelect from "@/components/ButtonSelect";
import { useEffect, useState } from "react";
import GoBack from "@/components/GoBack";
import RegisterNewUser from "@/components/form/Users/registerNewUser";

const FormPage = () => {
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");

    if (usuarioGuardado !== null) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUser(true);
      console.log("ESTO ES LO QUE ESTOY BUSCANDO!", usuarioParseado);
    } else {
      console.log("No hay datos de usuario en el localStorage.");
    }
  }, [user]);

  return (
    <Layout
      title="Page Form Design"
      titlePage="Formularios"
      description="Página principal formularios"
      image="/silla.png"
    >
      {user === false ? (
        <div className={styles.containerUsers}>
          <RegisterNewUser setUser={setUser} />
        </div>
      ) : (
        <>
          <h1>¿Qué deseas hacer?</h1>
          <div className={styles.containerPrincipal}>
            <div className={styles.containerElements}>
              <Link href="/form/register">
                <ButtonSelect title="Registar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes registrar un nuevo diseñador o diseño.
              </p>
            </div>

            <div className={styles.containerElements}>
              <Link href="/form/update">
                <ButtonSelect title="Actualizar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes actualizar un diseñador o diseño ya
                existente.
              </p>
            </div>

            <div className={styles.containerElements}>
              <Link href="/form/delete">
                <ButtonSelect title="Eliminar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes eliminar un diseñador o un diseño ya
                existente.
              </p>
            </div>
          </div>

          <GoBack direction="/form" />
        </>
      )}
    </Layout>
  );
};

export default FormPage;
