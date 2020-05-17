/*
Author: Anas Nasrallah.
Peupose: Weather App.
Date: 13.05.20
*/

class Manager {

    constructor() {
        if (Manager.instance instanceof Manager) {
            return Manager.instance;
        }
        this.cityData = [];
        Manager.instance = this;
    }

    getDataFromDB = async function () {
        const cities = await $.get('/cities')
        const concatenated = this.cityData.concat(cities)
        const unique = []
        for (let item1 of concatenated) {
            let exists = false
            for (let item2 of unique) {
                if (item1.name === item2.name) {
                    exists = true
                }
            }
            if (!exists) { unique.push(item1) }
        }
        this.cityData = unique
    }

    saveCity = async function (cityName) {
        const city = this.cityData.find(city => city.name === cityName)
        await $.post('/city', city)
    }

    getCityData = async function (cityName) {
        const city = await $.get(`/city/${cityName}`)
        this.cityData.push(city);
    }

    removeCity = async function (cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function () { }
        })
    }
}

