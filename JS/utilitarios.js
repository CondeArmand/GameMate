export function gerarNumeroAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
    const numeroString = numeroAleatorio.toString().padStart(6, '0'); // Converte o número para string e preenche com zeros à esquerda, se necessário
    return numeroString + '#'; // Adiciona a '#' no final
}

export function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

