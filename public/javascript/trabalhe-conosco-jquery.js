let edicao = false;
let profissionalId = null;

const Profissional = {
  limpar: () => {
    $('#nome').val(null)
    $('#cpf').val(null);
    $('#telefone').val(null);
    $('#nascimento').val(null);
    $('#profissaoList').val('null');
    $('#escolaridadeList').val('null');
    $('#habilidades').val(null)
  },

  limparMenosCpf: () => {
    $('#nome').val(null);
    $('#telefone').val(null);
    $('#nascimento').val(null);
    $('#profissaoList').val('null');
    $('#escolaridadeList').val('null');
    $('#habilidades').val(null);
  },

  salvar: () => {

    let cpf = $('#cpf').val();
    if (cpf){
      cpf = cpf.replaceAll('-', '').replaceAll('.', '');
    }

    if (!testaCPF(cpf)) {
      showError('CPF inválido!')
      return false;
    }
    
    let nome = $('#nome').val();
    if (!nome) {
      showError('Preencha seu nome!')
      return false;
    }
    
        let nascimento = $('#nascimento').val();
        if (!nascimento) {
          showError('Data de nascimento inválida!')
          return false;
        }

    let telefone = $('#telefone').val();
    if (telefone) {
      telefone = telefone.replaceAll('-', '').replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '');
    }

    if (telefone.length < 11) {
      showError('Telefone inválido!')
      return false;
    }

    let profissao = $('#profissaoList').find(":selected").attr('id')?.replace('profissao-', '')
    if (!profissao) {
      showError('Escolha sua profissão!')
      return false;
    }

    let escolaridade = $('#escolaridadeList').find(":selected").attr('id')?.replace('escolaridade-', '')
    if (!escolaridade) {
      showError('Escolha sua escolaridade!')
      return false;
    }

    let habilidades = $('#habilidades').val()
    if (!habilidades) {
      showError('Preencha suas habilidades!')
      return false;
    }

    var t = {}
    t.cpf = cpf
    t.nome = nome
    t.telefone = telefone
    t.nascimento = nascimento
    t.profissao = profissao
    t.escolaridade = escolaridade
    t.habilidades = habilidades
    
    if (edicao) {
      t.id = profissionalId;

      $.ajax({
        type: 'PUT',
        url: '/profissional',
        data: t,
        success: () => {
          window.location.href = '/?success=true';
        },
        dataType: 'json',
        error: err => {
          showError(err.responseText)
        }
      })
    } else {
      $.ajax({
        type: 'POST',
        url: '/profissional',
        data: t,
        success: () => {
          window.location.href = '/?success=true';
        },
        dataType: 'json',
        error: err => {
          showError(err.responseText)
        }
      })
    }

    return false
  },

  buscaUm: (id) => {
    $.ajax({
      type: 'GET',
      url: '/profissional/' + id,
      dataType: 'json',
      success: Profissional.preencheForm,
      error: () => {
        showError('Profissional não encontrado!')
      }
    }) 
  },

  buscaUmByCpf: () => {
    
    let cpf = $('#cpf').val();
    cpf = cpf.replaceAll('-', '').replaceAll('.', '');
    
    if (!testaCPF(cpf)) {
      showError('CPF inválido!')
      return false;
    }
    showForm();
    
    $.ajax({
      type: 'GET',
      url: '/profissional/cpf/' + cpf,
      dataType: 'json',
      success: (data) => {
        edicao = true;
        Profissional.preencheForm(data);
      },
      error: () => {
        edicao = false;
        profissionalId = null;
        showError('Profissional não encontrado!')
        Profissional.limparMenosCpf();
      }
    }) 
  },
  
  preencheForm: data => {
    profissionalId = data.id;
    $('#nome').val(data.nome)
    $('#cpf').val(formataCpf(data.cpf));
    $('#telefone').val(formataTelefone(data.telefone));
    $('#nascimento').val(new Date(data.dataNascimento).toISOString().substring(0, 10));
    $('#profissaoList').val(data.profisso.nome)
    $('#escolaridadeList').val(data.escolaridade.nome)
    $('#habilidades').val(data.habilidades)
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

const showForm = () => {
  $('#form').attr('class', 'd-block')
}

$(() => {

  // Busca todas as profissões no banco
  Profissao.buscaTodos();
  Escolaridade.buscaTodos();

  // Input masks
  $('#cpf').mask('000.000.000-00');
  $('#telefone').mask('(00) 0 0000-0000')
  $("#cpf").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        Profissional.buscaUmByCpf();
    }
});

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  if (id) {
    edicao = true;
    Profissional.buscaUm(id);
    showForm();
  }

})