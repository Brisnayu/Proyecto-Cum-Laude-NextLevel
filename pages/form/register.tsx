import Layout from "@/components/Layout";
import FormDesignPage from "@/components/form/Register/formDesign";
import FormDesignerPage from "@/components/form/Register/formDesigner";
import { useState } from "react";
import styles from "@/styles/stylesForm/register.module.css";
import Image from "next/image";
import ButtonSelectForm from "@/components/ButtonSelectForm";

const RegisterPage = () => {
  const [registerDesign, setRegisterDesign] = useState<boolean>(false);
  const [registerDesigner, setRegisterDesigner] = useState<boolean>(false);

  const showDesign = () => {
    setRegisterDesign(true);
  };

  const showDesigner = () => {
    setRegisterDesigner(true);
  };

  return (
    <Layout
      title="Page Register"
      description="Página principal formularios"
      image="/silla.png"
    >
      <div className={styles.containerPrincipal}>
        {!registerDesign && !registerDesigner && (
          <>
            <div className={styles.containerButtons}>
              <ButtonSelectForm
                title="Nuevo Diseño"
                functionElement={showDesign}
                selectClass="buttonUp"
              />
              <ButtonSelectForm
                title="Nuevo Diseñador"
                functionElement={showDesigner}
                selectClass="buttonUp"
              />
            </div>
            <div className={styles.containerImage}>
              <h2>¿Quieres registrar un nuevo Diseño o un nuevo Diseñador?</h2>
              <Image
                src="/imageForm/register.png"
                alt="Image Form Register"
                width={300}
                height={300}
              />
            </div>
          </>
        )}

        {registerDesign && <FormDesignPage />}
        {registerDesigner && <FormDesignerPage />}
      </div>
    </Layout>
  );
};

export default RegisterPage;
