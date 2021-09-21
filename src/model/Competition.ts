export enum COMPETITION_STATUS {
    ONGOING = "em andamento",
    FINISHED = "finalizada"
}

export interface CompetitionInputDTO {
    name: string | undefined,
}

export class Competition {
    constructor(
        private name: string,
        private status: COMPETITION_STATUS
    ) { }

    getName(): string {
        return this.name;
    };

    getStatus(): COMPETITION_STATUS {
        return this.status
    }

    setName(newName: string): void {
        this.name = newName;
    };

    setEmail(newStatus: COMPETITION_STATUS): void {
        this.status = newStatus;
    };

    static toCompetitionModel(data: any): Competition {
        return new Competition(data.name, data.status);
    };
};