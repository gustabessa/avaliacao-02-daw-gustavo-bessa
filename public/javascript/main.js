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

Handlebars.registerHelper('formatDate', date => {
  return formataData(date);
})

Handlebars.registerHelper('formatCpf', cpf => {
  return formataCpf(cpf);
})

Handlebars.registerHelper('formatTelefone', telefone => {
  return formataTelefone(telefone);
})