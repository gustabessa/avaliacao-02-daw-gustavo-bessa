const Profissional = {

  deletar: (id) => {
    let t = {}
    t.id = id
    $.ajax({
      type: 'DELETE',
      url: '/profissional',
      data: t,
      success: () => {
        showSuccess('Profissional excluído com sucesso.')
        Profissional.buscaTodos()
      },
      dataType: 'json',
      error: err => {
        showError(err.responseText)
      }
    })
  },

  buscaTodos: () => {

    let t = {}
    let cpf = $('#cpf').val();
    if (cpf){
      t.cpf = cpf.replaceAll('-', '').replaceAll('.', '');
    } else {
      t.cpf = null;
    }

    let nome = $('#nome').val()
    t.nome = nome
    
    t.dataNascInicial = $('#nascimentoInicial').val()
    t.dataNascFinal = $('#nascimentoFinal').val()

    $.ajax({
      type: 'GET',
      url: '/profissional',
      dataType: 'json',
      data: t,
      success: Profissional.preencherTemplate,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },

  preencherTemplate: (data) => {
    let vagasTemplate = $('#vagas-template').html()
    let results = $('#results')
    var template = Handlebars.compile(vagasTemplate)

    results.html(template(data))
  }
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
  Profissional.buscaTodos();
  $('#cpf').mask('000.000.000-00');
})