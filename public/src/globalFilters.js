import Vue from 'vue';

Vue.filter('moneda', function (value, signo) {
    return signo + Number(value == "" ? 0 : value).toFixed(2);
})

Vue.filter('cuotas', function (value, cantCuotas) {
    return ((value / cantCuotas) * 1.5).toFixed(2);
})


