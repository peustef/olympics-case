import { CustomError } from "../error/CustomError";
import { Competition } from "../model/Competition";
import { BaseDatabase } from "./BaseDatabase";

export class CompetitionDatabase extends BaseDatabase {
    private static TABLE_NAME = "olympic_competitions"

    async create(newCompetition: Competition): Promise<void> {
        try {
            await BaseDatabase.connection(CompetitionDatabase.TABLE_NAME)
                .insert({
                    name: newCompetition.getName()
                })
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }

    }

    public async updateStatus(name: string): Promise<void> {

        try {
            await BaseDatabase.connection.raw(`
                UPDATE ${CompetitionDatabase.TABLE_NAME}
                SET status = "finalizada"
                WHERE name = "${name}";
            `)
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    public async findByName(name: string): Promise<Competition | undefined> {

        const competition = await BaseDatabase.connection(CompetitionDatabase.TABLE_NAME)
            .select('*')
            .where({ name: name })
        return competition[0] && Competition.toCompetitionModel(competition[0]);
    }


}