import $ from 'jquery'

const loadHtmlSuccessCallbacks = [] // Definindo array com várias funções

export function onLoadHtmlSuccess(callback) { //Registrando essas funções a partir da função onLoadHtmlSuccess
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) { //Função irá ler todos os wm-include e o parâmetro Parent será a tag que contém esse atributo
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({ //chamada AJAX
            url,
            success(data) {
                $(e).html(data) // setando o data dentro do html
                $(e).removeAttr('wm-include') //Exclui a propriedade para que não haja nenhuma interpretação novamente dela.

                loadHtmlSuccessCallbacks.forEach(callback => callback(data)) //Sempre que carregar um HTML chamará qualquer função que ele possua para ser executado
                loadIncludes(e) //Processa a função loadIncludes de maneira recursiva até não haver nenhum wm-include para ser processado.

            }
        })
    })
}

loadIncludes()