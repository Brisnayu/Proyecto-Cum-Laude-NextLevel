import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/pages/form/principalPageForm.module.css";
import FormRegister from "@/components/form/Register/formRegister";
import DesignForm from "@/components/form/BasicForm/designForm";
import DesignerForm from "@/components/form/BasicForm/designerForm";
import HomeForm from "@/components/form/BasicForm/HomeForm";
import GoBack from "@/components/GoBack";

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
          <HomeForm
            firstTitle="Nuevo Diseño"
            secondTitle="Nuevo Diseñador"
            titleImage="Elige una opción para poder hacer un nuevo registro"
            image="/imageForm/register.png"
            showDesign={showDesign}
            showDesigner={showDesigner}
          />
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

      <GoBack direction="/form" />
      
    </Layout>
  );
};

export default RegisterPage;
