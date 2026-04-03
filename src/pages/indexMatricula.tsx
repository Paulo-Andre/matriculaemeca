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

export default function DadosAluno({ dado, setDados }: Props) {
  const navigate = useNavigate();

  // CONTROLE DOS CAMPOS DINÂMICOS
  const [mostrarLaudo, setMostrarLaudo] = useState(false);
  const [mostrarBeneficio, setMostrarBeneficio] = useState(false);
  const [mostrarAlergia, setMostrarAlergia] = useState(false);
  const [mostrarIrmao, setMostrarIrmao] = useState(false);

  // MÁSCARAS
  const mascaraCPF = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const mascaraTelefone = (valor: string) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(dado);
    console.log("setDados:", setDados);
console.log("tipo:", typeof setDados);

    if (form.checkValidity()) {
      navigate("/DadosPai");
    } else {
      form.reportValidity();
    }
  };
 

  return (
    <div className="formulario-page">
      <div className="formulario-container">

        {/* HEADER */}
        <header className="formulario-header">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="header-text">
              <h1>Ficha de Matrícula</h1>
              <p>Dados do Aluno</p>
            </div>

            <img src="logo_escola.svg" alt="Logo" style={{ width: "50px" }} className="imagem" />
          </div>

          <ProgressBar etapaAtual={0} />
        </header>

        {/* FORM */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* A. IDENTIFICAÇÃO */}
            <div className="section-title">A. Identificação</div>

            <div className="form-grid">

              <div className="field">
                <label>Nome completo *</label>
                <input name="nomeDoAluno" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Nacionalidade *</label>
                <input name="nacionalidadeAluno" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Naturalidade *</label>
                <input name="naturalidadeAluno" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label htmlFor=""> UF*</label>
              
              <select name="ufAluno"
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
                <input type="date" name="dataNascimentoAluno"    onChange={(e) => salvaDados(e, setDados)}/>
              </div>

              <div className="field">
                <label>Sexo *</label>
                <select name="sexoDoAluno" required onChange={(e) => salvaDados(e, setDados)}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="field">
                <label>Raça / Cor *</label>
                <select name="racaCorDoAluno" id=""required onChange={(e) => salvaDados(e, setDados)}>
                  <option value="">Selecione</option>
                  <option value="Branca">Branca</option>
                  <option value="Preta">Preta</option>
                  <option value="Parda">Parda</option>
                  <option value="Amarela">Amarela</option>
                  <option value="Indígena">Indígena</option>
                  <option value="Prefiro não declarar">Prefiro não declarar</option>                  
                </select>
               
              </div>

            </div>

            {/* B. DOCUMENTOS */}
            <div className="section-title">B. Documentos</div>

            <div className="form-grid">

              <div className="field">
                <label>Cartão SUS *</label>
                <input type="number" name="cartaoSusDoAluno" required onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>CPF *</label>
                <input
                  name="cpfDoAluno"
                  required
                  onChange={(e) => {
                    e.target.value = mascaraCPF(e.target.value);
                    salvaDados(e, setDados);
                  }}
                />
              </div>            

              

              <div className="field">
                <label>RG</label>
                <input type="text" name="rgAluno" onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Órgão emissor</label>
                <input name="orgaoEmissorAluno" onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Data de expedição</label>
                <input type="date" name="dataExpedicaoAluno" onChange={(e) => salvaDados(e, setDados)} />
              </div>

              <div className="field">
                <label>Número do NIS</label>
                <input type="number" name="numeroNisAluno" onChange={(e) => salvaDados(e, setDados)} />
              </div>

            </div>

            {/* C. INFORMAÇÕES */}
            <div className="section-title">C. Informações adicionais</div>

            <div className="form-grid">

              <div className="field">
                <label>Possui laudo?</label>
                <select
                  name="possuiLaudoAluno"
                  onChange={(e) => {
                    setMostrarLaudo(e.target.value === "sim");
                    salvaDados(e, setDados);
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              {mostrarLaudo && (
                <div className="field">
                  <label>Descreva o laudo</label>
                  <input name="descricaoLaudo" onChange={(e) => salvaDados(e, setDados)} />
                </div>
              )}

              <div className="field">
                <label>Recebe benefício?</label>
                <select
                  name="recebeBeneficioAluno"
                  onChange={(e) => {
                    setMostrarBeneficio(e.target.value === "sim");
                    salvaDados(e, setDados);
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              {mostrarBeneficio && (
                <div className="field">
                  <label>Qual benefício?</label>
                  <input name="descricaoBeneficio" onChange={(e) => salvaDados(e, setDados)} />
                </div>
              )}

              <div className="field">
                <label>Possui alergia?</label>
                <select
                  name="alergiaAluno"
                  onChange={(e) => {
                    setMostrarAlergia(e.target.value === "sim");
                    salvaDados(e, setDados);
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              {mostrarAlergia && (
                <div className="field">
                  <label>Qual alergia?</label>
                  <input name="descricaoAlergia" onChange={(e) => salvaDados(e, setDados)} />
                </div>
              )}

              <div className="field">
                <label>Tem irmão na escola?</label>
                <select
                  name="temIrmaosEscola"
                  onChange={(e) => {
                    setMostrarIrmao(e.target.value === "sim");
                    salvaDados(e, setDados);
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              {mostrarIrmao && (
                <div className="field">
                  <label>Nome do irmão</label>
                  <input name="nomeIrmao" onChange={(e) => salvaDados(e, setDados)} />
                </div>
              )}

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