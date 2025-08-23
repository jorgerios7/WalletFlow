export function HandleErroMessage(message: string) {
  if (message === 'auth/invalid-email') {
    return 'E-mail inválido.';
  } else if (message === 'auth/missing-email') {
    return 'Informe um e-mail.';
  } else if (message === 'auth/user-disabled') {
    return 'Esta conta foi desativada.';
  } else if (message === 'auth/user-not-found') {
    return 'Usuário não encontrado.';
  } else if (message === 'auth/wrong-password') {
    return 'Senha incorreta.';
  } else if (message === 'auth/invalid-credential') {
    return 'Credenciais inválidas.';
  } else if (message === 'auth/invalid-password') {
    return 'Senha inválida.';
  } else if (message === 'auth/missing-password') {
    return 'Informe a senha.';
  } else if (message === 'auth/email-already-in-use') {
    return 'Este e-mail já está em uso.';
  } else if (message === 'auth/weak-password') {
    return 'A senha é muito fraca.';
  } else if (message === 'auth/operation-not-allowed') {
    return 'Operação não permitida. Verifique a configuração do provedor.';
  } else if (message === 'auth/requires-recent-login') {
    return 'Faça login novamente para concluir esta ação.';
  } else if (message === 'auth/too-many-requests') {
    return 'Muitas tentativas. Tente novamente mais tarde.';
  } else if (message === 'auth/network-request-failed') {
    return 'Falha de rede. Verifique sua conexão.';
  } else if (message === 'auth/popup-closed-by-user') {
    return 'A janela foi fechada antes de concluir a operação.';
  } else if (message === 'auth/popup-blocked') {
    return 'O pop-up foi bloqueado pelo navegador.';
  } else if (message === 'auth/credential-already-in-use') {
    return 'Estas credenciais já estão vinculadas a outra conta.';
  } else if (message === 'auth/provider-already-linked') {
    return 'O provedor já está vinculado a esta conta.';
  } else if (message === 'auth/no-such-provider') {
    return 'O provedor solicitado não está disponível.';
  } else if (message === 'auth/timeout') {
    return 'Tempo de operação esgotado. Tente novamente.';
  } else if (message === 'auth/invalid-verification-code') {
    return 'Código de verificação inválido.';
  } else if (message === 'auth/invalid-verification-id') {
    return 'ID de verificação inválido.';
  } else if (message === 'auth/invalid-phone-number') {
    return 'Número de telefone inválido.';
  } else if (message === 'auth/quota-exceeded') {
    return 'Limite de SMS excedido temporariamente. Tente mais tarde.';
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}
