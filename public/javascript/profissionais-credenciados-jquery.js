const Profissional = {
  salvar: () => {
    console.log($('#cpf').val())
  },

  buscaTodos: () => {
    $.ajax({
      type: 'GET',
      url: '/profissional',
      dataType: 'json',
      success: Profissional.preencherTemplate,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },

  preencherTemplate: (data) => {
    console.log(data)
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
  Profissional.buscaTodos()
})