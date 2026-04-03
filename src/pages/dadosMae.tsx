import "../components/css/formulario.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./progressBar";
import type { SetDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";
import { salvaDados } from "../components/useState_SalvandoDados/salvandoDadosUseState";

type Props = {
  dado: SetDados;
  setDados: React.Dispatch<React.SetStateAction<SetDados>>;
};

export default function DadosMae({ dado, setDados }: Props) {
  const navigate = useNavigate();

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
      navigate("/EstadoCivilDosPais");
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
              <p>Dados da Mãe / Responsável</p>
            </div>

            <img src="logo_escola.svg" alt="Logo" style={{ width: "50px" }} className="imagem" />
          </div>

          <ProgressBar etapaAtual={2} />
        </header>

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* A. IDENTIFICAÇÃO */}
            <div className="section-title">A. Identificação</div>

            <div className="form-grid">

              <div className="field">
                <label>Nome completo *</label>
                <input name="nomeMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Nacionalidade *</label>
                <input name="nacionalidadeMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Naturalidade *</label>
                <input name="naturalidadeMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              
              
              <div className="field">
                <label htmlFor=""> UF*</label>
              
              <select name="ufMae"
  required
  
  onChange={(e) => salvaDados(e, setDados)}
>
  
  <option value="">Selecione</option>
  <option value="MG">Minas Gerais</option>

  <option value="AC">Acre</option>
  <option value="AL">Alagoas</option>
  <option value="AP">Amapá</option>
  <option value="AM">Amazonas</option>
  <option value="BA">Bahia</option>
  <option value="CE">Ceará</option>
  <option value="DF">Distrito Federal</option>
  <option value="ES">Espírito Santo</option>
  <option value="GO">Goiás</option>
  <option value="MA">Maranhão</option>
  <option value="MT">Mato Grosso</option>
  <option value="MS">Mato Grosso do Sul</option>
  <option value="PA">Pará</option>
  <option value="PB">Paraíba</option>
  <option value="PR">Paraná</option>
  <option value="PE">Pernambuco</option>
  <option value="PI">Piauí</option>
  <option value="RJ">Rio de Janeiro</option>
  <option value="RN">Rio Grande do Norte</option>
  <option value="RS">Rio Grande do Sul</option>
  <option value="RO">Rondônia</option>
  <option value="RR">Roraima</option>
  <option value="SC">Santa Catarina</option>
  <option value="SP">São Paulo</option>
  <option value="SE">Sergipe</option>
  <option value="TO">Tocantins</option>
</select>
</div>

              <div className="field">
                <label>Data de nascimento *</label>
                <input type="date" name="dataDeNascimentoMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Profissão *</label>
                <input name="profissaoMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

            </div>

            {/* B. DOCUMENTOS */}
            <div className="section-title">B. Documentos</div>

            <div className="form-grid">

              <div className="field">
                <label>CPF *</label>
                <input
                  name="cpfMae"
                  required
                  onChange={(e) => {
                    e.target.value = mascaraCPF(e.target.value);
                    salvaDados(e, setDados);
                  }}
                />
              </div>

              <div className="field">
                <label>RG *</label>
                <input type="text" name="rgMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Órgão emissor *</label>
                <input name="orgaoEmissorMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Data de expedição *</label>
                <input type="date" name="dataExpedicaoMae" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

            </div>

            {/* C. CONTATO */}
            <div className="section-title">C. Contato</div>

            <div className="form-grid">

              <div className="field">
                <label>Telefone *</label>
                <input
                  name="telefoneMae"
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
                  name="whatsappMae"
                  required
                  onChange={(e) => {
                    e.target.value = mascaraTelefone(e.target.value);
                    salvaDados(e, setDados);
                  }}
                />
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