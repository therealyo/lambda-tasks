const calculations = require("../utils/calculations");


describe("Calculations tests", () => {
    test("price for 10000 english symbols expected to be 1200", () => {
        expect(calculations.calculatePrice(10000, "eng")).toBe(1200);
    })
    test("price for <1000 english symbols expected to be 120", () =>{
        expect(calculations.calculatePrice(800, "eng")).toBe(120);
    })
    test("price for 10000 cyrillic symbols expected to be 500", () => {
        expect(calculations.calculatePrice(10000, "ukr")).toBe(500);
    })
    test("price for <1000 english symbols expected to be 50", () => {
        expect(calculations.calculatePrice(150, "rus")).toBe(50);
    })
    test("test for calculating deadline in the same day", () => {
        const request = {
            language: "eng",
            count: 100,
            date: new Date()
        };
        let end = new Date(request.date.getTime() + calculations.calculateTime(request.count, request.language));
        end = end.toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline in the same day, but order before working hours", () => {
        const request = {
            language: "eng",
            count: 100,
            date: new Date("Mon, 25 July 2022 9:00:00")
        };
        const end = (new Date("Mon, 25 July 2022 11:00:00")).toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline when ordered after working hours", () => {
        const request = {
            language: "eng",
            count: 100,
            date: new Date("Mon, 25 July 2022 21:00:00")
        };
        let end = (new Date("Tue, 26 July 2022 11:00:00")).toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline when ordered in non-working days", () => {
        const request = {
            language: "eng",
            count: 333,
            date: new Date("Sun, 24 July 2022 13:30:00")
        }
        const end = (new Date("Mon, 25 July 2022 11:30:00")).toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline when time needed is more than time remainded in the day", () => {
        const request = {
            language: "eng",
            count: 3330,
            date: new Date("Mon, 25 July 2022 13:30:00")
        }
        const end = (new Date("Tue, 26 July 2022 15:00:00")).toLocaleString()
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline for task >1 week", () => {
        const request = {
            language: 'eng',
            count: 20979,
            date: new Date("Mon, 11 July 2022 13:30:00")
        }
        const end = (new Date("Wed, 20 July 2022 14:00:00")).toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
    test("test for calculating deadline when deadline ends in next month", () => {
        const request = {
            language: 'eng',
            count: 20979,
            date: new Date("Mon, 25 July 2022 13:30:00")
        }
        const end = (new Date("Wed, 3 Aug 2022 14:00:00")).toLocaleString();
        const timeNeeded = calculations.calculateTime(request.count, request.language);
        const result = calculations.calculateDeadline(request.date, timeNeeded).toLocaleString();
        expect(result).toBe(end);
    })
})
