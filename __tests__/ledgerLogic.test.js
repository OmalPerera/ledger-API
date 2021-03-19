const { generateLedger, basePayment, splitAccordingToFrequency } = require('business-logic/ledgerLogic');

const actualLeaseData = {
    startDate: '2021-03-28T00:00:00Z',
    endDate: '2021-05-27T20:00:00Z',
    frequency: 'fortnightly',
    weeklyRent: '555',
    timezone: 'Australia/Brisbane'
}

describe("Function definitions in logic class", () => {

    test('generateLedger() should be defined', () => {
        const actualFList = ['WEEKLY', 'FORTNIGHTLY', 'MONTHLY'];
        expect(generateLedger(actualFList, actualLeaseData)).toBeDefined();
    });


    test('basePayment() should be defined', () => {
        expect(basePayment(555, 'monthly')).toBeDefined();
    });


    test('splitAccordingToFrequency() should be defined', () => {
        expect(splitAccordingToFrequency(actualLeaseData, 7)).toBeDefined();
    });

});




describe("Testing LINE ITEM BREAKDOWN - for given FREQUENCY", () => {


    it('should return expected values for WEEKLY frequency', () => {
        const expectedData = [
            {
                startDate: '2021-03-28T00:00:00.000Z',
                endDate: '2021-04-03T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-04-04T00:00:00.000Z',
                endDate: '2021-04-10T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-04-11T00:00:00.000Z',
                endDate: '2021-04-17T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-04-18T00:00:00.000Z',
                endDate: '2021-04-24T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-04-25T00:00:00.000Z',
                endDate: '2021-05-01T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-05-02T00:00:00.000Z',
                endDate: '2021-05-08T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-05-09T00:00:00.000Z',
                endDate: '2021-05-15T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-05-16T00:00:00.000Z',
                endDate: '2021-05-22T00:00:00.000Z',
                amount: 555
            },
            {
                startDate: '2021-05-23T00:00:00.000Z',
                endDate: '2021-05-27T20:00:00.000Z',
                amount: 396.43
            }]

        const calculatedData = splitAccordingToFrequency(actualLeaseData, 7);
        expect(calculatedData).toEqual(expectedData);
    });



    it('should return expected values for FORTNIGHTLY frequency', () => {
        const expectedData = [
            {
                startDate: '2021-03-28T00:00:00.000Z',
                endDate: '2021-04-10T00:00:00.000Z',
                amount: 1110
            },
            {
                startDate: '2021-04-11T00:00:00.000Z',
                endDate: '2021-04-24T00:00:00.000Z',
                amount: 1110
            },
            {
                startDate: '2021-04-25T00:00:00.000Z',
                endDate: '2021-05-08T00:00:00.000Z',
                amount: 1110
            },
            {
                startDate: '2021-05-09T00:00:00.000Z',
                endDate: '2021-05-22T00:00:00.000Z',
                amount: 1110
            },
            {
                startDate: '2021-05-23T00:00:00.000Z',
                endDate: '2021-05-27T20:00:00.000Z',
                amount: 396.43
            }]

        const calculatedData = splitAccordingToFrequency(actualLeaseData, 14);
        expect(calculatedData).toEqual(expectedData);
    });


    it('should return expected values for MONTHLY frequency', () => {

        const inputData = {
            startDate: '2021-03-15T00:00:00Z',
            endDate: '2021-08-27T20:00:00Z',
            frequency: 'monthly',
            weeklyRent: '1000',
            timezone: 'Australia/Canberra'
        }
        const expectedData = [
            {
                startDate: '2021-03-15T00:00:00.000Z',
                endDate: '2021-04-14T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-04-15T00:00:00.000Z',
                endDate: '2021-05-14T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-05-15T00:00:00.000Z',
                endDate: '2021-06-14T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-06-15T00:00:00.000Z',
                endDate: '2021-07-14T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-07-15T00:00:00.000Z',
                endDate: '2021-08-14T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-08-15T00:00:00.000Z',
                endDate: '2021-08-27T20:00:00.000Z',
                amount: 1857.14
            }]

        const calculatedData = splitAccordingToFrequency(inputData, 'monthly');
        expect(calculatedData).toEqual(expectedData);
    });


    it('should return expected values for MONTHLY frequency : Lease starts on 31 st', () => {

        const inputData = {
            startDate: '2021-01-31T00:00:00Z',
            endDate: '2021-05-27T20:00:00Z',
            frequency: 'monthly',
            weeklyRent: '1000',
            timezone: 'Australia/Canberra'
        }
        const expectedData = [
            {
                startDate: '2021-01-31T00:00:00.000Z',
                endDate: '2021-02-27T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-02-28T00:00:00.000Z',
                endDate: '2021-03-30T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-03-31T00:00:00.000Z',
                endDate: '2021-04-29T00:00:00.000Z',
                amount: 4345.24
            },
            {
                startDate: '2021-04-30T00:00:00.000Z',
                endDate: '2021-05-27T20:00:00.000Z',
                amount: 4000
            }]

        const calculatedData = splitAccordingToFrequency(inputData, 'monthly');
        expect(calculatedData).toEqual(expectedData);
    });



});