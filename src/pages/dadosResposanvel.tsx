import "../components/css/formulario.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "./progressBar";
import type { SetDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";
import { salvaDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";

type Props = {
  dado: SetDados;
  setDados: React.Dispatch<React.SetStateAction<SetDados>>;
};

export default function DadosResponsavelLegal({ dado, setDados }: Props) {
  const navigate = useNavigate();

  const [tipoResponsavel, setTipoResponsavel] = useState("");

  // 🔹 MÁSCARAS
  const mascaraCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const mascaraTelefone = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity()) {
      navigate("/Endereco");
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
              <p>Responsável Legal</p>
            </div>

            <img src="logo_escola.svg" alt="Logo" style={{ width: "50px" }} className="imagem" />
          </div>

          <ProgressBar etapaAtual={3} />
        </header>

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* A. TIPO */}
            <div className="section-title">A. Responsável</div>

            <div className="form-grid">

              <div className="field">
                <label>Quem é o responsável? *</label>
                <select
                  name="tipoResponsavel"
                  required
                  onChange={(e) => {
                    setTipoResponsavel(e.target.value);
                    salvaDados(e, setDados);
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="pais">Os pais</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

            </div>

            {/* B. DADOS */}
            {tipoResponsavel === "outro" && (
              <>
                <div className="section-title">B. Dados do Responsável</div>

                <div className="form-grid">

                  <div className="field">
                    <label>Nome completo *</label>
                    <input name="nomeResponsavel" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>Parentesco *</label>
                    <input name="parentesco" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>CPF *</label>
                    <input
                      name="cpfResponsavel"
                      required
                      onChange={(e) => {
                        e.target.value = mascaraCPF(e.target.value);
                        salvaDados(e, setDados);
                      }}
                    />
                  </div>

                  <div className="field">
                    <label>RG *</label>
                    <input type="text" name="rgResponsavel" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>Órgão emissor *</label>
                    <input name="orgaoEmissorResponsavel" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>Data de expedição *</label>
                    <input type="date" name="dataExpedicaoResponsavel" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>Profissão *</label>
                    <input name="profissaoResponsavel" required onChange={(e) => salvaDados(e, setDados)} />
                  </div>

                  <div className="field">
                    <label>Telefone *</label>
                    <input
                      name="telefoneResponsavel"
                      required
                      onChange={(e) => {
                        e.target.value = mascaraTelefone(e.target.value);
                        salvaDados(e, setDados);
                      }}
                    />
                  </div>

                  <div className="field">
                    <label>WhatsApp *</label>
                    <input
                      name="whatsappResponsavel"
                      required
                      onChange={(e) => {
                        e.target.value = mascaraTelefone(e.target.value);
                        salvaDados(e, setDados);
                      }}
                    />
                  </div>

                </div>
              </>
            )}

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