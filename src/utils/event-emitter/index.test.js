import EventEmitter from ".";

describe("the EventEmitter object", () => {
	it("should allow for publishing and subscribing to events", (done) => {
		const eventEmitterCallback = (event) => {
			expect(event.eventName).toEqual("testEmitterEvent");
			done();
		};
		EventEmitter.subscribe("testEmitterEvent", (event) => eventEmitterCallback(event));
		EventEmitter.dispatch("testEmitterEvent", {
			eventName: "testEmitterEvent",
		});
	});
});
