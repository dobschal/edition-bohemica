import Vue from "vue";
import { i18n } from "../main";

Vue.filter('capitalize', function (value) {
    if (!value) return "";
    return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
});

/**
 *  Transform rate value like -0.34 i.e. to -34%.
 *  Value should be a float value
 */
Vue.filter('percent', value => {
    if ( !value || isNaN(value) ) return "0%";
    return `${value * 100}%`;
});

/**
 *  Display float value with a specific amount of numbers
 *  after the comma.
 */
Vue.filter('numbersAfterComma', (value, numbersAfterComma) => {
    if ( !value || isNaN(value) ) return "0.0";
    let parsedFloat = parseFloat( value );
    return parsedFloat.toFixed( numbersAfterComma);
});

Vue.filter('price', (value, numbersAfterComma) => {
    if ( !value || isNaN(value) ) return "€ 0,00";
    let parsedFloat = parseFloat( value );
    let fixed = parsedFloat.toFixed( 2 );
    return "€ " + fixed.replace(".", ",");
});

Vue.filter('minutesToAccurateUnit', value => {
    if ( !value || isNaN(value) ) return "0m";
    let parsedFloat = parseFloat( value );    
    switch ( true )
    {
        case parsedFloat < 1: 
            return `${value * 60}${i18n.t("timeUnits.seconds")}`;
        case parsedFloat < 60: 
            return `${value * 60}${i18n.t("timeUnits.minutes")}`;
        case parsedFloat > 1440:         
            return `${value / 60 / 24}${i18n.t("timeUnits.days")}`;
        default:         
            return `${value / 60}${i18n.t("timeUnits.hours")}`;
    }
});