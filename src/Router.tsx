import {  BrowserRouter, Routes,Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";




//version up 으로 인해 Switch 대신 Routes를 사용 
//v6 이후 element속성 사용해야함.
function Router (){
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/:coinId" element={<Coin />} />
          <Route path="/" element={   <Coins />} />
        </Routes>
      </BrowserRouter>
    );
}


/* const Router = createBrowserRouter([
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

]); */

export default Router;