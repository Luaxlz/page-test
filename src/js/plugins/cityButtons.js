import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'
const duration = 400

function filterByCity(city) { //Função para filtrar as imgs
    $('[wm-city]').each(function (i, e) { //percorre cara um dos elementos que possuem o attr wm-city
        const isTarget = $(this).attr('wm-city') === city || city === null // Checa se o elemento é o alvo do parametro city
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)//Se for o alvo faz fadein, se já estiver visível não faz nada.
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            }) //Se não for o alvo vai sumir com fadeOut
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })
    
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
        btn.click(e => filterByCity(city))
        return btn
    })
    
    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)
    
    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)
    
    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons()
})
