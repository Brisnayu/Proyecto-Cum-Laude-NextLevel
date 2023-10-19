import React, { useRef, useState } from "react";
import styles from "@/styles/form.module.css";

function FileInputCustomColor() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleFileChange = () => {
    if (fileInputRef.current) {
      const files = fileInputRef.current.files;
      if (files) {
        setIsEmpty(files.length === 0);
      }
    }
  };

  return (
    <div className={styles.pruebaStilos}>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className={`${styles.customFileLabel} ${isEmpty ? "empty" : ""}`}
        data-empty={isEmpty}
      >
        {isEmpty ? (
          <p className={styles.prueba1}>Seleccionar archivo</p>
        ) : (
            <p className={styles.prueba2}>Archivo seleccionado</p>
        )}
      </label>
    </div>
  );
}

export default FileInputCustomColor;
