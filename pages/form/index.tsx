import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/stylesForm/index.module.css";

const FormPage = () => {
  return (
    <Layout
      title="Page Form Design"
      description="Página principal formularios"
      image="/silla.png"
    >
      <h1>¿Qué deseas hacer?</h1>
      <div className={styles.containerPrincipal}>
        
        <Link href="/form/register">
          <h2>Registrar</h2>
        </Link>

        <h2>Actualizar</h2>

        <h2>Eliminar</h2>
      </div>
    </Layout>
  );
};

export default FormPage;
