import "../components/css/formulario.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./progressBar";
import type { SetDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";
import { salvaDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";

type Props = {
  dado: SetDados;
  setDados: React.Dispatch<React.SetStateAction<SetDados>>;
};

export default function DadosEndereco({ dado, setDados }: Props) {
  const navigate = useNavigate();

  // 🔹 MÁSCARA CEP (SEM ALTERAR ESTRUTURA)
  const mascaraCEP = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  // 🔹 (CASO PRECISE DE CPF NO FUTURO)
  const mascaraCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity()) {
      navigate("/HistoricoDaCrianca");
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="formulario-page">
      <div className="formulario-container">

        {/* HEADER */}
        <header className="formulario-header">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div className="header-text">
              <h1>Ficha de Matrícula</h1>
              <p>Endereço</p>
            </div>

            <img src="logo_escola.svg" alt="Logo" style={{ width: "50px" }} className="imagem" />
          </div>

          <ProgressBar etapaAtual={5} />
        </header>

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* A. ENDEREÇO */}
            <div className="section-title">A. Endereço</div>

            <div className="form-grid">

              <div className="field">
                <label>Rua *</label>
                <input name="rua" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Bairro *</label>
                <input name="bairro" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Cidade *</label>
                <input name="cidade" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Estado *</label>
                <input name="estado" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>CEP *</label>
                <input
                  name="cep"
                  required
                  onChange={(e) => {
                    e.target.value = mascaraCEP(e.target.value);
                    salvaDados(e, setDados);
                  }}
                />
              </div>

              <div className="field">
                <label>Situação da casa *</label>
                <select
                  name="situacaoCasa"
                  required
                  onChange={(e) => salvaDados(e, setDados)}
                >
                  <option value="">Selecione</option>
                  <option value="PROPRIA">Própria</option>
                  <option value="ALUGADA">Alugada</option>
                  <option value="CEDIDA">Cedida</option>
                  <option value="OCUPACAO">Ocupação</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>

            </div>

            {/* BOTÕES */}
            <div className="form-actions">

              <button
                type="button"
                className="btn-next"
                onClick={() => navigate(-1)}
                style={{ background: "#64748b" }}
              >
                Voltar
              </button>

              <button type="submit" className="btn-next">
                Próximo
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}