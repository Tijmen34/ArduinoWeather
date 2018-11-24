let weather = new Vue({
    el: "#weather",

    data: {
        bmp280: {
            temperature: '',
            pressure: '',
            altitude: ''
        },
        dht11: {
            temperature: '',
            humidity: ''
        },
        ds18b20: {
            temperature: ''
        },
        openweather: {
            temperature: '',
            pressure: '',
            humidity: ''
        }
    },

    created: function () {
        this.fetchData();
    },

    methods: {
        fetchData: function () {
            const postUrl = "http://192.168.1.32:3000/data/currentweather";
            const _this = this;
            $.get(postUrl, (data) => {
                for (let i = 0; i < data.length; i++) {
                    const currentObject = data[i];
                    switch (Object.keys(currentObject)[0]) {
                        case "bmp280": {
                            const bmp280Values = currentObject.bmp280;
                            _this.bmp280.temperature = bmp280Values[0].temperature;
                            _this.bmp280.pressure = bmp280Values[0].pressure;
                            _this.bmp280.altitude = bmp280Values[0].altitude;

                            break;
                        }
                        case "ds18b20": {
                            const ds18b20Values = currentObject.ds18b20;
                            _this.ds18b20.temperature = ds18b20Values[0].temperature;
                            break;
                        }
                        case "dht11": {
                            const dht11Values = currentObject.dht11;
                            _this.dht11.temperature = dht11Values[0].temperature;
                            _this.dht11.humidity = dht11Values[0].humidity;

                            break;
                        }
                        case "openweather": {
                            const openWeatherValues = currentObject.openweather;
                            _this.openweather.temperature = openWeatherValues[0].temperature;
                            _this.openweather.pressure = openWeatherValues[0].pressure;
                            _this.openweather.humidity = openWeatherValues[0].humidity;

                            break;
                        }
                    }
                }
            })
        }
    }
});

/**
 * On window load.
 */
$(function () {
    setInterval(function(){
        weather.fetchData()}, 30000)
});
