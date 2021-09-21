import { app } from "./data/app";
import { competitionRouter } from "./routes/competitionRouter"
import { resultRouter } from "./routes/resultRouter"

app.use("/competition", competitionRouter)

app.use("/result", resultRouter)