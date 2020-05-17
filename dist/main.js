/*
Author: Anas Nasrallah.
Peupose: Weather App.
Date: 13.05.20
*/

const manager = new Manager()
const renderer = new Renderer()

const loadPage = async function () {
    await manager.getDataFromDB()
    renderer.renderData(manager.cityData)
}

const handleSearch = function () {
    const cityName = $('#city-input').val()
    $('#city-input').val('')
    manager.getCityData(cityName).then(function () {
        loadPage()
    })
}

$("#search-btn").on('click', function () {
    handleSearch()
})

$('#cities').on('click', 'button', async function () {
    const cityName = $(this).closest('.city').data().name
    if ($(this).data().favourite === false) {
        $(this).data().favourite = true
        $(this).removeClass("add-btn")
        $(this).addClass("remove-btn")
        $(this).text("-")
        await manager.saveCity(cityName)
    } else {
        $(this).data().favourite = false
        $(this).removeClass("remove-btn")
        $(this).addClass("add-btn")
        $(this).text("+")
        await manager.removeCity(cityName)
    }
})

loadPage()