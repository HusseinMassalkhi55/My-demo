const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');
const syllable = require('syllable');

class Scratch3YourExtension {

  constructor (runtime) {
    this.syllable = syllable;
  }

  getInfo () {
    return {
      id: 'yourScratchExtension',
      name: 'Demo',
      color1: '#000099',
      color2: '#660066',
      blocks: [
        {
          opcode: 'myFirstBlock',
          blockType: BlockType.REPORTER,
          text: 'Title for ISBN book [BOOK_NUMBER]',
          arguments: {
            BOOK_NUMBER: {
              defaultValue: 1718500564,
              type: ArgumentType.NUMBER
            }
          }
        },
        {
          opcode: 'mySecondBlock',
          blockType: BlockType.REPORTER,
          text: 'Syllables in [MY_TEXT]',
          arguments: {
            MY_TEXT: {
              defaultValue: 'Hello World',
              type: ArgumentType.STRING
            }
          }
        },
        {
          opcode: 'getWeather',
          blockType: BlockType.REPORTER,
          text: 'Current weather in [CITY]',
          arguments: {
            CITY: {
              defaultValue: 'Beirut',
              type: ArgumentType.STRING
            }
          }
        }
      ]
    };
  }

  myFirstBlock ({ BOOK_NUMBER }) {
    return fetch('https://openlibrary.org/isbn/' + BOOK_NUMBER + '.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return { title: 'Unknown' };
        }
      })
      .then((bookinfo) => {
        return bookinfo.title;
      })
      .catch((error) => {
        console.error('Error fetching book info:', error);
        return 'Error fetching title';
      });
  }

  mySecondBlock ({ MY_TEXT }) {
    return this.syllable(MY_TEXT);
  }

  getWeather({ CITY }) {
    const apiKey = 'f56dd4b445458e09f03bbe3ccd5a007f';
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.8938&lon=35.5018&exclude=hourly,daily&appid=${apiKey}&units=metric`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return { weather: 'Unknown' };
        }
      })
      .then((weatherData) => {
        return `Temperature: ${weatherData.current.temp}°C, ${weatherData.current.weather[0].description}`;
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        return 'Error fetching weather';
      });
  }
}

module.exports = Scratch3YourExtension;