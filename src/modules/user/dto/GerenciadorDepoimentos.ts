class Depoimento {
  constructor(
    public usuario: string,
    public mentor: string,
    public mensagem: string,
  ) {}
}

export class GerenciadorDepoimentos {
  private depoimentos: Depoimento[];

  constructor() {
    this.depoimentos = [];
  }

  adicionarDepoimento(usuario: string, mentor: string, mensagem: string) {
    const depoimento = new Depoimento(usuario, mentor, mensagem);
    this.depoimentos.push(depoimento);
  }

  buscarDepoimentosPorMentor(mentor: string): Depoimento[] {
    return this.depoimentos.filter(
      (depoimento) => depoimento.mentor === mentor,
    );
  }

  excluirDepoimento(usuario: string, mentor: string, mensagem: string) {
    this.depoimentos = this.depoimentos.filter((depoimento) => {
      return !(
        depoimento.usuario === usuario &&
        depoimento.mentor === mentor &&
        depoimento.mensagem === mensagem
      );
    });
  }
}
