var expect = require('expect');
var {generateMessage} = require('./../utils/message');

describe('generateMessage', (req, res) => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
