console.log("slider-config.js loaded");

export class SliderConfig {
    static createSlider(elementId, options) {
      const element = document.getElementById(elementId);
      const minInput = document.getElementById(options.minInputId);
      const maxInput = document.getElementById(options.maxInputId);
      console.log('Days slider range:', minInput.value, maxInput.value);

      const sliderConfig = {
        start: [Number(minInput.value), Number(maxInput.value)],
        connect: true,
        range: {
          'min': Number(minInput.value),
          'max': Number(maxInput.value)
        },
        step: options.step || 1
      };
  
      noUiSlider.create(element, sliderConfig);
      
      element.noUiSlider.on('update', (values, handle) => {
        const roundedValues = values.map(value => Math.round(value));
        minInput.value = roundedValues[0];
        maxInput.value = roundedValues[1];
        
        if (options.onUpdate) {
          options.onUpdate(roundedValues);
        }
      });
  
      return element.noUiSlider;
    }
  }