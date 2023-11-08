import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/stylesForm/index.module.css";
import ButtonSelectForm from "@/components/ButtonSelectForm";
import PrincipalUser from "@/components/form/Users/principalUser";
import { useState } from "react";

const FormPage = () => {
  const [user, setUser] = useState<boolean>(false);

  return (
    <Layout
      title="Page Form Design"
      description="Página principal formularios"
      image="/silla.png"
    >
      {user === false ? (
        <PrincipalUser setUser={setUser} />
      ) : (
        <>
          <h1>¿Qué deseas hacer?</h1>
          <div className={styles.containerPrincipal}>
            <div className={styles.containerElements}>
              <Link href="/form/register">
                <ButtonSelectForm title="Registar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes registrar un nuevo diseñador o diseño.
              </p>
            </div>

            <div className={styles.containerElements}>
              <Link href="/form/update">
                <ButtonSelectForm title="Actualizar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes actualizar un diseñador o diseño ya
                existente.
              </p>
            </div>

            <div className={styles.containerElements}>
              <Link href="/form/delete">
                <ButtonSelectForm title="Eliminar" selectClass="buttonUp" />
              </Link>

              <p>
                En este apartado puedes eliminar un diseñador o un diseño ya
                existente.
              </p>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default FormPage;
