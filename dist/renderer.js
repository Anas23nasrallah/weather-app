/*
Author: Anas Nasrallah.
Peupose: Weather App.
Date: 13.05.20
*/

class Renderer {
    renderData = function (cities) {
        const source = $('#city-temp').html();
        const template = Handlebars.compile(source)
        let citiesHTML = template({ cities })
        $('#cities').empty().append(citiesHTML)
    }
}