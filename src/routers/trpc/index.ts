import { appRouter } from "./context";
import { urlrouter } from "./url";


export const trpcRouter=appRouter({
    router:urlrouter
})