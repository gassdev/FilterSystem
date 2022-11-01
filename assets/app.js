// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Filter from './modules/Filter.js'

new Filter(document.querySelector('.js-filter'))


const slider = document.getElementById('price-slider');

if (slider) {

    /**
     * @type {HTMLInputElement}
     */
     const min = document.getElementById('min')
     /**
      * @type {HTMLInputElement}
      */
     const max = document.getElementById('max')
    const minValue = Math.floor(parseInt(slider.dataset.min, 10) / 10) * 10
    const maxValue = Math.ceil(parseInt(slider.dataset.max, 10) / 10) * 10
    const range = noUiSlider.create(slider, {
        start: [min.value || minValue, max.value ||  maxValue],
        connect: true,
        step: 10,
        range: {
            'min': minValue,
            'max': maxValue
        }
    });

    

    range.on('slide', function(values, handle) {
        if (handle == 0) {
            min.value = Math.round(values[0])
        }
        if (handle == 1) {
            max.value = Math.round(values[1])
        }
    })
    range.on('end', function (values, handle) {
        min.dispatchEvent(new Event('change'))
    })
}

 