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
      if (res.data.erro) {
        setMessage("Esse CEP não existe");
        setCep({});
      } else {
        setMessage("");
        setCep(res.data);
      }
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
            placeholder="Digite o CEP"
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
          <p>
            <span>CEP: </span> {cep.cep}
          </p>
          <p>
            <span>Endereço: </span> {cep.logradouro}
          </p>
          <p>
            <span>Bairro: </span> {cep.bairro}
          </p>
          <p>
            <span>Cidade: </span>
            {cep.localidade}-{cep.uf}
          </p>
        </section>
      )}
    </main>
  );
}
