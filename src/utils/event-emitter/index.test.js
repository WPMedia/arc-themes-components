import EventEmitter from ".";

describe("the EventEmitter object", () => {
	it("should allow for publishing and subscribing to events", (done) => {
		const eventEmitterCallback = (event) => {
			expect(event.eventName).toEqual("testEmitterEvent");
			done();
		};
		EventEmitter.subscribe("testEmitterEvent", eventEmitterCallback);
		EventEmitter.dispatch("testEmitterEvent", {
			eventName: "testEmitterEvent",
		});
	});

	it("should ignore unknown events", () => {
		const eventEmitterCallback = jest.fn();
		EventEmitter.subscribe("testEmitterEvent", eventEmitterCallback);
		EventEmitter.dispatch("testEmitterEvent_invalid");
		expect(eventEmitterCallback).not.toHaveBeenCalled();
	});
});
