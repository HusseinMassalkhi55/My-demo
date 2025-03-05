const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {

  constructor (runtime) {
    import('syllable')
      .then((syllableModule) => {
        this.syllable = syllableModule.syllable;
      });
  }

  getInfo () {
    return {
      // unique ID for your extension
      id: 'yourScratchExtension',
  
      // name displayed in the Scratch UI
      name: 'Demo',
  
      // colours to use for your extension blocks
      color1: '#000099',
      color2: '#660066',
  
      // your Scratch blocks
      blocks: [
        {
          // function where your code logic lives
          opcode: 'myFirstBlock',
  
          // type of block
          blockType: BlockType.REPORTER,
  
          // label to display on the block
          text: 'Title for ISBN book [BOOK_NUMBER]',
  
          // arguments used in the block
          arguments: {
            BOOK_NUMBER: {
              defaultValue: 1718500564,
  
              // type/shape of the parameter
              type: ArgumentType.NUMBER
            }
          }
        },
        {
          // function where your code logic lives
          opcode: 'mySecondBlock',
  
          // type of block
          blockType: BlockType.REPORTER,
  
          // label to display on the block
          text: 'Syllables in [MY_TEXT]',
  
          // arguments used in the block
          arguments: {
            MY_TEXT: {
              defaultValue: 'Hello World',
  
              // type/shape of the parameter
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
            }
            else {
              return { title: 'Unknown' };
            }
          })
          .then((bookinfo) => {
            return bookinfo.title;
          });
      }
      mySecondBlock ({ MY_TEXT }) {
        return this.syllable(MY_TEXT);
      }

}

module.exports = Scratch3YourExtension;



