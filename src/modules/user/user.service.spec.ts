import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { CryptService } from '@common/services/crypt';
import { AuthInvalidError, ObjectAlreadyExistsError } from '@common/errors';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SignInUserDto } from './dto';
import { MailService } from '@common/services/mail';
import { TemporaryCodeRepository } from './temporary-code.repository';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { GerenciadorDepoimentos } from './dto/GerenciadorDepoimentos';

describe('GerenciadorDepoimentos - Adicionar e Buscar', () => {
  let gerenciador: GerenciadorDepoimentos;

  beforeEach(() => {
    gerenciador = new GerenciadorDepoimentos();
  });

  it('deve adicionar um depoimento corretamente', () => {
    gerenciador.adicionarDepoimento('Usuário 1', 'Mentor 1', 'Ótimo mentor!');

    const depoimentosMentor1 =
      gerenciador.buscarDepoimentosPorMentor('Mentor 1');

    expect(depoimentosMentor1.length).toBe(1);
    expect(depoimentosMentor1[0].usuario).toBe('Usuário 1');
    expect(depoimentosMentor1[0].mentor).toBe('Mentor 1');
    expect(depoimentosMentor1[0].mensagem).toBe('Ótimo mentor!');
  });

  describe('GerenciadorDepoimentos - Excluir', () => {
    let gerenciador: GerenciadorDepoimentos;

    beforeEach(() => {
      gerenciador = new GerenciadorDepoimentos();
    });

    it('deve excluir um depoimento corretamente', () => {
      gerenciador.adicionarDepoimento('Usuário 1', 'Mentor 1', 'Ótimo mentor!');
      gerenciador.adicionarDepoimento(
        'Usuário 2',
        'Mentor 1',
        'Excelente suporte!',
      );

      gerenciador.excluirDepoimento('Usuário 1', 'Mentor 1', 'Ótimo mentor!');

      const depoimentosMentor1 =
        gerenciador.buscarDepoimentosPorMentor('Mentor 1');
      expect(depoimentosMentor1.length).toBe(1);
      expect(depoimentosMentor1[0].usuario).toBe('Usuário 2');
      expect(depoimentosMentor1[0].mentor).toBe('Mentor 1');
      expect(depoimentosMentor1[0].mensagem).toBe('Excelente suporte!');
    });
  });
});
