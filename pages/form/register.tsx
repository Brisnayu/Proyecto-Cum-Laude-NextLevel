import Layout from "@/components/Layout";
import FormDesignPage from "@/components/form/Register/formDesign";
import FormDesignerPage from "@/components/form/Register/formDesigner";
import { useState } from "react";

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
      {!registerDesign && !registerDesigner && (
        <>
          <button onClick={showDesign}>Nuevo Diseño</button>
          <button onClick={showDesigner}>Nuevo Diseñador</button>
        </>
      )}

      {registerDesign && <FormDesignPage />}

      {registerDesigner && <FormDesignerPage />}
    </Layout>
  );
};

export default RegisterPage;
