$(() => 
{
  $('#sidebarCollapse').text('>')
  // Botao sidebar
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    inner = $('#sidebarCollapse').text();
  
    if (inner === '>') {
      $('#sidebarCollapse').text('<')
    } else {
      $('#sidebarCollapse').text('>')
    }
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const success = urlParams.get('success');

  if (success) {
    window.history.replaceState(null, null, window.location.pathname);
    showSuccess('Profissional salvo com sucesso.')
  }
})

function formataData(date) {
  let dtCreation = new Date(date)
  return new Intl.DateTimeFormat('pt-BR').format(dtCreation)
}

function formataCpf(cpf) {
  cpf=cpf.replace(/\D/g,"")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  return cpf
}
 
function formataTelefone(telefone) {
  telefone = '(' + telefone.slice(0, 2) + ') ' + telefone[2] + ' ' + telefone.slice(3, 7) + '-' + telefone.slice(7)
  return telefone;
}

function showSuccess(msg) {
  $.toast({
    text: msg,
    heading: 'Sucesso', 
    icon: 'success',
    showHideTransition: 'fade', 
    allowToastClose: true,
    hideAfter: 3000, 
    stack: 5, 
    position: 'bottom-center',
    textAlign: 'left',
    loader: false,  
  });
}

function showError(msg) {
  $.toast({
    text: msg,
    heading: 'Erro', 
    icon: 'error',
    showHideTransition: 'fade', 
    allowToastClose: true,
    hideAfter: 3000, 
    stack: 5, 
    position: 'bottom-center',
    textAlign: 'left',
    loader: false,  
  });
}

function showWarning(msg) {
  $.toast({
    text: msg,
    heading: 'Aviso', 
    icon: 'warning',
    showHideTransition: 'fade', 
    allowToastClose: true,
    hideAfter: 3000, 
    stack: 5, 
    position: 'bottom-center',
    textAlign: 'left',
    loader: false,  
  });
}

Handlebars.registerHelper('formatDate', date => {
  return formataData(date);
})

Handlebars.registerHelper('formatCpf', cpf => {
  return formataCpf(cpf);
})

Handlebars.registerHelper('formatTelefone', telefone => {
  return formataTelefone(telefone);
})

function cadastro() {
  window.location.href = "/cadastro-profissional"
}


function testaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;
  if (strCPF == "11111111111") return false;
  if (strCPF == "22222222222") return false;
  if (strCPF == "33333333333") return false;
  if (strCPF == "44444444444") return false;
  if (strCPF == "55555555555") return false;
  if (strCPF == "66666666666") return false;
  if (strCPF == "77777777777") return false;
  if (strCPF == "88888888888") return false;
  if (strCPF == "99999999999") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}
