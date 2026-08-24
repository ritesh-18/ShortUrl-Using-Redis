import { trpcUrlController } from "../../controllers/trpc.controller"
import { appRouter} from "./context"


export const urlrouter=appRouter(trpcUrlController)