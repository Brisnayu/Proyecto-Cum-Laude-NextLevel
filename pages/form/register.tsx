import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/pages/form/principalPageForm.module.css";
import Image from "next/image";
import ButtonSelectForm from "@/components/ButtonSelect";
import FormRegister from "@/components/form/Register/formRegister";
import DesignForm from "@/components/form/BasicForm/designForm";
import DesignerForm from "@/components/form/BasicForm/designerForm";

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
      titlePage="Nuevo registro"
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
              <h2>Elige una opción para poder hacer un nuevo registro</h2>
              <Image
                src="/imageForm/register.png"
                alt="Image Form Register"
                width={300}
                height={300}
              />
            </div>
          </>
        )}

        {registerDesign && (
          <FormRegister
            title="Registra un nuevo diseño 🪑"
            photo="/imageForm/formDesign.png"
          >
            <DesignForm />
          </FormRegister>
        )}

        {registerDesigner && (
          <FormRegister
            title="Registra un nuevo diseñador 🛋️"
            photo="/imageForm/formDesigner.png"
          >
            <DesignerForm />
          </FormRegister>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;
