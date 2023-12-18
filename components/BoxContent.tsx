import styles from "@/styles/components/boxContent.module.css";

const BoxContent = ({ title, children }: BoxContentProps) => {
  return (
    <div className={styles.boxContent}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export type BoxContentProps = {
  title: string;
  children: React.ReactNode;
};

export default BoxContent;
