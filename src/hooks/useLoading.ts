import { useState } from "react";

// Cria um hook de useLoading personalizado
function useLoading() {
  // Cria um estado de carregamento com o valor inicial false
  const [loading, setLoading] = useState(false);

  // Cria uma função para iniciar o carregamento
  function startLoading() {
    // Define o estado de carregamento como true
    setLoading(true);
  }

  // Cria uma função para encerrar o carregamento
  function endLoading() {
    // Define o estado de carregamento como false
    setLoading(false);
  }

  // Retorna o estado de carregamento e as funções de controle
  return { loading, startLoading, endLoading };
}
