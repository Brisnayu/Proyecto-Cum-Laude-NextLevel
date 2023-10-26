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
                title="Actualizar un diseño"
                functionElement={showDesign}
                selectClass="buttonUp"
              />
              <ButtonSelectForm
                title="Actualizar un diseñador"
                functionElement={showDesigner}
                selectClass="buttonUp"
              />
            </div>
            <div className={styles.containerImage}>
              <h2>¿Qué deseas actualizar?</h2>
              <Image
                src="/imageForm/update.png"
                alt="Image Form Update"
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
