import { MessageService } from "./message.service";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {

    });

    it ('should have no messages to start', () => {
        service = new MessageService();

        expect(service.messages.length).toBe(0);
    });

    it ('should add a message', () => {
        service = new MessageService();

        service.add('Message1');

        expect(service.messages.length).toBe(1);
    });

    it ('should Clear messages', () => {
        service = new MessageService();
        service.add('Message1');

        service.clear();

        expect(service.messages.length).toBe(0);
    });
});
