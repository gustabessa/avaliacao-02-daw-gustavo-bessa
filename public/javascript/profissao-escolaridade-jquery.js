const Profissao = {

  salvar: () => {
    let t = {}
    t.nome = $('#profissaoNome').val()

    $.ajax({
      type: 'POST',
      url: '/profissao',
      dataType: 'json',
      data: t,
      success: data => {
        $('#profissaoNome').val('')
        preencherTabela(data, 'profissoes', 'profissao-template')
        showSuccess('Profissao salva com sucesso.')
      },
      error: err => {
        showError(err.responseText)
      }
    })
  },

  deletar: (id) => {
    let t = {}
    t.id = id
    $.ajax({
      type: 'DELETE',
      url: '/profissao',
      data: t,
      success: () => {
        showSuccess('Profissao excluída com sucesso.')
        limparTabela('profissoes')
        Profissao.buscaTodos()
      },
      dataType: 'json',
      error: err => {
        showError(err.responseText)
      }
    })
  },

  deletar: (id) => {
    let t = {}
    t.id = id
    $.ajax({
      type: 'DELETE',
      url: '/profissao',
      data: t,
      success: () => {
        showSuccess('Profissao excluída com sucesso.')
        limparTabela('profissoes')
        Profissao.buscaTodos()
      },
      dataType: 'json',
      error: err => {
        showError(err.responseText)
      }
    })
  },

  buscaTodos: () => {
    $.ajax({
      type: 'GET',
      url: '/profissao',
      dataType: 'json',
      success: data => {
        preencherTabela(data, 'profissoes', 'profissao-template')
      },
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

  deletar: (id) => {
    let t = {}
    t.id = id
    $.ajax({
      type: 'DELETE',
      url: '/escolaridade',
      data: t,
      success: () => {
        showSuccess('Escolaridade excluída com sucesso.')
        limparTabela('escolaridades')
        Escolaridade.buscaTodos()
      },
      dataType: 'json',
      error: err => {
        showError(err.responseText)
      }
    })
  },

  salvar: () => {
    let t = {}
    t.nome = $('#escolaridadeNome').val()

    $.ajax({
      type: 'POST',
      url: '/escolaridade',
      dataType: 'json',
      data: t,
      success: data => {
        t.nome = $('#escolaridadeNome').val('')
        preencherTabela(data, 'escolaridades', 'escolaridade-template')
        showSuccess('Escolaridade salva com sucesso.')
      },
      error: err => {
        showError(err.responseText)
      }
    })
  },

  buscaTodos: () => {
    $.ajax({
      type: 'GET',
      url: '/escolaridade',
      dataType: 'json',
      success: data => {
        preencherTabela(data, 'escolaridades', 'escolaridade-template')
      },
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

$(document).ready(() => {
  Profissao.buscaTodos()
  Escolaridade.buscaTodos()
})

function limparTabela(tabelaId) {
  $('#' + tabelaId).html('')
}

function preencherTabela(data, resultId, templateId) {
  let profissaoEscolaridadeTemplate = $('#' + templateId).html()
  let results = $('#' + resultId)
  var template = Handlebars.compile(profissaoEscolaridadeTemplate)
  html = results.html()
  if (!(data instanceof Array)) {
    arr = []
    arr[0] = data
    data = arr
  }
  templateHtml = template(data)
  results.html(html + templateHtml)
}