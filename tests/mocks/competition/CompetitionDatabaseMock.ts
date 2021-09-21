import { Competition } from "../../../src/model/Competition";
import { competitionMock } from "./CompetitionMock";

export class CompetitionDatabaseMock {
    async create(newCompetition: Competition): Promise<void> {


    }

    public async updateStatus(name: string): Promise<void> {


    }

    public async findByName(name: string): Promise<Competition | undefined> {

        switch (name) {
            case "competition_mock":
                return competitionMock
            default:
                return undefined
        }
    }


}