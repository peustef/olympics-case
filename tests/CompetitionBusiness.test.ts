import {CompetitionBusiness} from '../src/business/CompetitionBusiness'
import { CompetitionDatabaseMock } from './mocks/competition/CompetitionDatabaseMock';

const competitionBusinessMock = new CompetitionBusiness(
    new CompetitionDatabaseMock()
)

describe("Testing create competition", () => {

    test("Must return error when name is empty", async () => {
        expect.assertions(2);
        try {

            await competitionBusinessMock.create(
                {
                    name: "",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("'name' must be provided");
            expect(error.code).toBe(422);

        }
    });

    test("Must return error when competition already exists", async () => {
        expect.assertions(2);
        try {

            await competitionBusinessMock.create(
                {
                    name: "competition_mock",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual("competition already exists");
            expect(error.code).toBe(422);

        }
    });

    test("Success creating competition", async () => {
        expect.assertions(0);
        try {

            await competitionBusinessMock.create(
                {
                    name: "new_competition_mock",
                }
            );

        } catch (error: any) {

            expect(error.message).toEqual(error.message);
            expect(error.code).toBe(error.code);

        }
    });

})