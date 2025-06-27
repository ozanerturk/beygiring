describe("ProgramPage E2E", () => {
	beforeEach(() => {
		cy.visit("/"); // Adjust route if needed
	});

	it("renders main buttons and components", () => {
		// Check buttons
		cy.get(".header-button-group").within(() => {
			cy.get('input[value="Generate New Program"]').should("be.visible");
			cy.get('input[value="Start/Stop"]').should("be.visible");
		});

		// Check component containers
		cy.get(".left-side").should("exist");
		cy.get(".content-body").should("exist");
		cy.get(".right-side").should("exist");
	});

	it("displays correct initial horse count in HorseList", () => {
		// Horse count in header must be a number >= 0
		cy.get(".left-side table thead tr:first-child th")
			.invoke("text")
			.then((text) => {
				const match = text.match(/\((\d+)\)/);
				expect(match).to.not.be.null;
				expect(Number(match![1])).to.be.gte(0);
			});
	});

	it("Generate New Program updates horse list and races", () => {
		cy.get('input[value="Generate New Program"]').click();

		// After clicking, the horse count should update (non-zero)
		cy.get(".left-side table thead tr:first-child th")
			.invoke("text")
			.then((text) => {
				const match = text.match(/\((\d+)\)/);
				expect(match).to.not.be.null;
				expect(Number(match![1])).to.be.greaterThan(0);
			});

		// Also verify RaceProgram tables show races generated
		cy.get(".right-side .race-item table").its("length").should("be.gte", 1);
	});

	it("Start/Stop toggles race animation and updates RaceTrack", () => {
		cy.get('input[value="Start/Stop"]').click();

		cy.get(".content-body .race .horse-runway").should("exist");

		cy.wait(10000);
		cy.get(".content-body .race .horse-runway").each(($el) => {
			cy.wrap($el)
				.find(".place-tag span")
				.invoke("text")
				.should("match", /\d+/);
		});

		cy.get('input[value="Start/Stop"]').click();
	});

	it("RaceProgram displays both Program and Results tables correctly", () => {
		// Program tables should have at least one race
		cy.get(".right-side .race-item")
			.first()
			.within(() => {
				cy.get("table").should("exist");
				cy.get("tbody tr").its("length").should("be.gte", 1);
			});

		// Results tables might be empty initially, but structure should be present
		cy.get(".right-side .race-item")
			.last()
			.within(() => {
				cy.get("table").should("exist");
			});
	});
});
