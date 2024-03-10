import {  createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Root from "./Root";

const Router = createBrowserRouter([
    {   path: "/",
        element : <Root />,
        children : [
            {
                path : "",
                element:<Coins />,
            },
            {
                path : "/:coinId",
                element : <Coin />,
            },
            
        ],
     },

]);

export default Router;