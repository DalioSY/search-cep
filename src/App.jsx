import { useState } from "react";
import "./App.css";
import "boxicons";
import api from "./servers/api";

export function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  const [message, setMessage] = useState("");

  async function btSearch() {
    try {
      const res = await api.get(`${input}/json`);
      setMessage("");
      setCep(res.data);
      setInput("");
    } catch {
      setMessage("Não foi encontrado, tente novamente");
      setCep("");
      setInput("");
    }
  }
  return (
    <main>
      <section>
        <h1>Buscar CEP</h1>
        <div className="input">
          <input
            type="text"
            mask="00000-000"
            placeholder='Digite o CEP "00000-000"'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <box-icon name="search-alt-2" onClick={btSearch}></box-icon>
        </div>
      </section>
      {message}
      {Object.keys(cep).length > 0 && (
        <section>
          <p>{cep.cep} </p>
          <p>{cep.logradouro}</p>
          <p>{cep.bairro} </p>
          <p>
            {cep.localidade}-{cep.uf}
          </p>
        </section>
      )}
    </main>
  );
}
