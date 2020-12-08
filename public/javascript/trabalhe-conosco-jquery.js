const Profissional = {
  salvar: () => {

    let cpf = $('#cpf').val();
    cpf = cpf.replaceAll('-', '').replaceAll('.', '');

    let telefone = $('#telefone').val();
    telefone = telefone.replaceAll('-', '').replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '');

    let nascimento = $('#nascimento').val();

    let profissao = $('#profissaoList').find(":selected").attr('id').replace('profissao-', '')

    let escolaridade = $('#escolaridadeList').find(":selected").attr('id').replace('escolaridade-', '')

    let habilidades = $('#habilidades').val()

    var t = {}
    t.cpf = cpf
    t.nome = $('#nome').val()
    t.telefone = telefone
    t.nascimento = nascimento
    t.profissao = profissao
    t.escolaridade = escolaridade
    t.habilidades = habilidades

    $.ajax({
      type: 'POST',
      url: '/profissional',
      data: t,
      dataType: 'json',
    })

    return false
  },
}

const Profissao = {

  buscaTodos: () => {
    $.ajax({
      type: 'GET',
      url: '/profissao',
      dataType: 'json',
      success: Profissao.preencherSelectArray,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },
  
  preencherSelectArray: arr => {
    Profissao.limparTodos()
    arr.forEach(profissao => {
      Profissao.preencherSelect(profissao)
    });
  },

  preencherSelect: data => {

    var select = $('#profissaoList')
    var option = $('<option></option>').attr('id', 'profissao-' + data.id).text(data.nome)

    $(select).append(option)
  },

  limparTodos: () => {
    let select = $('#profissaoList')[0]
    
    while (select.children[1]) {
      select.removeChild(select.children[1]);
    }
  },
}

const Escolaridade = {

  buscaTodos: () => {
    $.ajax({
      type: 'GET',
      url: '/escolaridade',
      dataType: 'json',
      success: Escolaridade.preencherSelectArray,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },
  
  preencherSelectArray: arr => {
    Escolaridade.limparTodos()
    arr.forEach(escolaridade => {
      Escolaridade.preencherSelect(escolaridade)
    });
  },

  preencherSelect: data => {

    var select = $('#escolaridadeList')
    var option = $('<option></option>').attr('id', 'escolaridade-' + data.id).text(data.nome)

    $(select).append(option)
  },

  limparTodos: () => {
    let select = $('#escolaridadeList')[0]
    
    while (select.children[1]) {
      select.removeChild(select.children[1]);
    }
  },
}

$(() => {

  // Busca todas as profissões no banco
  Profissao.buscaTodos();
  Escolaridade.buscaTodos();

  // Input masks
  $('#cpf').mask('000.000.000-00');
  $('#telefone').mask('(00) 0 0000-0000')

})