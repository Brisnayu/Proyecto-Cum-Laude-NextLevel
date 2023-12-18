import Layout from "@/components/Layout";
import PrincipalUser from "@/components/form/Users/principalUser";

const LoginPage = () => {
  return (
    <Layout
      title="Page login"
      titlePage="Rellena tus datos"
      description="Página  principal para iniciar sesión"
      image="/silla.png"
    >
      <PrincipalUser />
    </Layout>
  );
};

export default LoginPage;
