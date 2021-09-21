import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { ResultDatabase } from "../data/ResultDatabase";
import { CustomError } from "../error/CustomError";
import { Result, ResultInputDTO, ResultOutputDTO, RESULT_UNITY } from "../model/Result";

const competitionDatabase = new CompetitionDatabase()

export class ResultBusiness {
    constructor(
        private resultDatabase: ResultDatabase
    ) { }

    async register(input: ResultInputDTO) {
        const { competition, athlete, value, unity } = input

        if (!competition || !athlete || !value || !unity) {
            throw new CustomError(422, "'competition', 'athlete', 'value' and 'unity' must be provided")
        }

        const competitionCheck = await competitionDatabase.findByName(competition)

        if (!competitionCheck) {
            throw new CustomError(422, "competition doesn't exist")
        }

        if (competitionCheck.getStatus() === "finalizada") {
            throw new CustomError(422, "competition already finished")
        }

        const newResult = new Result(competition, athlete, value, unity)


        await this.resultDatabase.create(newResult)

    }

    async findRank(competition: string) {
        if (!competition) {
            throw new CustomError(422, "'competition' must be provided")
        }

        const competitionCheck = await competitionDatabase.findByName(competition)

        if (!competitionCheck) {
            throw new CustomError(422, "competition doesn't exist")
        }

        const tempResult = await this.resultDatabase.findRank(competition)

        if (tempResult && !tempResult[0]) {
            throw new CustomError(404, "Can't find registered results for this competition")
        }

        let order = ""

        if (tempResult && tempResult[0].getUnity() === "m") {

            tempResult.sort(function (a, b) {
                return a.getAthlete().localeCompare(b.getAthlete())
            })

            let result = []

            let higherResult: Result = tempResult[0];

            for (let i = 0; i < tempResult.length - 1; i++) {
                if (tempResult[i].getAthlete() === tempResult[i + 1].getAthlete()) {
                    if (tempResult[i + 1].getValue() > higherResult.getValue()) {
                        higherResult = tempResult[i + 1]
                    }
                }

                if (tempResult[i].getAthlete() !== tempResult[i + 1].getAthlete() || i === tempResult.length - 2) {
                    result.push(higherResult)
                    higherResult = tempResult[i + 1]
                }
            }

            result.sort(function (a, b) {
                return b.getValue() - (a.getValue())
            })

            return result
        } else if (tempResult && tempResult[0].getUnity() === "s") {
            order = "ASC"
        }

        const result = await this.resultDatabase.findRank(competition, order)

        return result

    }

}