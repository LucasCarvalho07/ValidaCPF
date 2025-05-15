class validaCpf {
    constructor(cpf) {
        this.cpf = cpf;
    };

   get cpfLimpo() {
        return this.cpf.replace(/[^0-9]/g, '');
    };

    verificaCpf() {
        if(typeof this.cpfLimpo === 'undefined') return "CPF invalido";
        if(this.cpfLimpo.length !== 11) return "CPF invalido";
        if(this.isSequencia()) return "CPF invalido";

        const cpfParcial = this.cpfLimpo.slice(0,-2);
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1);

        const novocpf = cpfParcial + digito1 + digito2;
        return novocpf === this.cpfLimpo ? ' CPF Valido' : 'cpf Inválido';
    };

    criaDigito(cpfparcial){
        const arrayCpf = Array.from(cpfparcial);

        let regressivo = cpfparcial.length + 1;
        const total = arrayCpf.reduce((ac,valor) => {
            ac += (regressivo * Number(valor));
            regressivo--;
            return ac;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    };

    isSequencia(){
        const Sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return Sequencia === this.cpfLimpo;
    };

}

const inputCpf = document.querySelector('.input-cpf');
const btnEnviar = document.querySelector('.btn-enviar');
const resultado = document.querySelector('.resultado');

btnEnviar.addEventListener('click', function(){
    const cpfDigitado = inputCpf.value;
    const novoCPf = new validaCpf(cpfDigitado);
    // console.log(novoCPf.verificaCpf());

    resultado.innerHTML = novoCPf.verificaCpf();
});

//  