/* Criando função para limpar formulario */
const limparFormulario = (endereco) => {
    /* Usando função do DOM (Document Object Model) */

    /* função para limpar o formulario */
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    
}


    /* Função para Popular o formulario */
    const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

   /* ^=inicio       $=fim */     /* um = esta atribuindo */    /* dois = esta comparando */
/* Validando o cep REGX*/
const eNumero = (numero) => /^[0-9]+$/;

/* Validando cep se tem 8 caracteres */
const cepValido = (cep) => cep.length == 8 && eNumero(numero);

/* Fazendo uma requisição para API viacep */
const pesquisaCEP = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Verificando se o cep é válido */
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if(endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'cep não encontrado!!!';
        } else {
            preencherFormulario(endereco);
        }
    }else{      
        document.getElementById('endereco').value = 'cep incorreto!';
}
}

document.getElementById('endereco')
.addEventListener ('focusout', pesquisaCEP); /* aguardando evento */

