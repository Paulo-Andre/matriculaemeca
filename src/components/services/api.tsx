export async function enviarMatricula(dados: any) {
  const response = await fetch("http://127.0.0.1:8000/matricula/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
    
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar");
  }

  return response.json();
}
