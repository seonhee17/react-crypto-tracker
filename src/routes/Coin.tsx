import { useParams } from "react-router";


function Coin(){
    
    const { coinId } = useParams();
    
    return (
        <h1>Coin's  key is : {coinId}</h1>
    );
}

export default Coin;