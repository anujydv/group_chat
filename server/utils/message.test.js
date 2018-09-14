var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./../utils/message');

describe('generateMessage', (req, res) => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
describe('generateLocationMessage', (req, res) => {
    it('should generate correct location object', () => {
        var from = 'Jen';
        var lat = 15;
        var lon = 19;
        var url = 'https://www.google.com/maps?q=15,19'
        var message = generateLocationMessage(from, lat,lon);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});
