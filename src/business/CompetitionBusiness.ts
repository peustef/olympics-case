import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { CustomError } from "../error/CustomError";
import { Competition, CompetitionInputDTO, COMPETITION_STATUS } from "../model/Competition";

export class CompetitionBusiness {

    constructor(
        private competitionDatabase: CompetitionDatabase
    ) { }

    async create(input: CompetitionInputDTO) {
        const { name } = input

        if (!name) {
            throw new CustomError(422, "'name' must be provided")
        }

        const competitionCheck = await this.competitionDatabase.findByName(name)

        if (competitionCheck?.getName() === name) {
            throw new CustomError(422, "competition already exists")
        }

        const status = COMPETITION_STATUS.ONGOING


        const newCompetition = new Competition(name, status)


        await this.competitionDatabase.create(newCompetition)

    }

    async finish(input: CompetitionInputDTO) {
        const { name } = input

        if (!name) {
            throw new CustomError(422, "'name' must be provided")
        }

        const competitionCheck = await this.competitionDatabase.findByName(name)

        if (!competitionCheck) {
            throw new CustomError(422, "competition doesn't exist")
        }

        if (competitionCheck.getStatus() === "finalizada") {
            throw new CustomError(422, "competition already finished")
        }

        await this.competitionDatabase.updateStatus(name)
    }

}