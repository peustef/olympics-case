import { CustomError } from "../error/CustomError";
import { Result } from "../model/Result";
import { BaseDatabase } from "./BaseDatabase";

export class ResultDatabase extends BaseDatabase {
    private static TABLE_NAME = "olympic_results"

    async create(newResult: Result): Promise<void> {
        try {
            await BaseDatabase.connection(ResultDatabase.TABLE_NAME)
                .insert({
                    competition: newResult.getCompetition(),
                    athlete: newResult.getAthlete(),
                    value: newResult.getValue(),
                    unity: newResult.getUnity()
                })
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }

    }


    public async findRank(competition: string, order: string = "DESC"): Promise<Result[] | undefined> {

        const result = await BaseDatabase.connection
            .raw(`
                SELECT * from ${ResultDatabase.TABLE_NAME}
                WHERE competition = "${competition}"
                ORDER BY value ${order};
        `)

        return result[0].map((res: Result) => Result.toResultModel(res));
    }


}