import { useState, useEffect } from "react";

export default function AtributosForm({ form, handleChange }) {
  const [largo, setLargo] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");

  const handleAtributoChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name: "atributos",
        value: { ...(form.atributos || {}), [name]: value },
      },
    });
  };

  useEffect(() => {
    const medidasStr = form?.atributos?.medidas;
    if (medidasStr) {
      const cleaned = String(medidasStr).replace(/\s*cm\s*$/i, "");
      const partes = cleaned.split(/\s*x\s*/i).map((v) => v.trim());
      if (partes.length > 0) {
        setLargo(partes[0]);
        setAlto(partes[1]);
        setAncho(partes[2]);
      }
    } else {
      setLargo("");
      setAlto("");
      setAncho("");
    }
  }, []);

  useEffect(() => {
    const medidasValidas = [
      largo && Number(largo) > 0 ? `${largo}` : null,
      alto && Number(alto) > 0 ? `${alto}` : null,
      ancho && Number(ancho) > 0 ? `${ancho}` : null,
    ].filter(Boolean);

    const medidasString =
      medidasValidas.length > 0 ? `${medidasValidas.join(" x ")} cm` : "";

    handleChange({
      target: {
        name: "atributos",
        value: { ...(form.atributos || {}), medidas: medidasString },
      },
    });
  
  }, [largo, alto, ancho]); 

  return (
    <div className="form__atributos">
      <h2>Atributos</h2>

      <label>Características</label>
      <input
        type="text"
        name="caracteristicas"
        value={form?.atributos?.caracteristicas || ""}
        onChange={handleAtributoChange}
      />

      <label>Color</label>
      <input
        type="text"
        name="color"
        value={form?.atributos?.color || ""}
        onChange={handleAtributoChange}
      />

      <label>Estructura</label>
      <input
        type="text"
        name="estructura"
        value={form?.atributos?.estructura || ""}
        onChange={handleAtributoChange}
      />

      <label>Materiales</label>
      <input
        type="text"
        name="materiales"
        value={form?.atributos?.materiales || ""}
        onChange={handleAtributoChange}
      />

      <label>Medidas [cm]</label>
      <div className="form__medidas">
        <input
          type="number"
          name="largo"
          value={largo}
          min={0}
          onChange={(e) => setLargo(e.target.value)}
          placeholder="Largo"
        />
        <input
          type="number"
          name="alto"
          value={alto}
          min={0}
          onChange={(e) => setAlto(e.target.value)}
          placeholder="Alto"
        />
        <input
          type="number"
          name="ancho"
          value={ancho}
          min={0}
          onChange={(e) => setAncho(e.target.value)}
          placeholder="Ancho"
        />
      </div>
    </div>
  );
}
