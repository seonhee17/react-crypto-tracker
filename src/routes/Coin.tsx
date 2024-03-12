import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items : center;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Title = styled.h1`
font-size: 48px;
color : ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
`;

interface RouteParams {
    coinId : string;
} 
interface RouteState {
    name : string;
} 

/* react-router-dom v6 부터 제네릭을 지원하지 않습니다.

interface RouterState {
name: string;
}

const location = useLocation();
const name = location.state as RouterState; */

function Coin(){
    
    const [isLoading , setLoading] = useState(true);
    const [info , setInfo] = useState({});
    const [price , setPrice] = useState({});
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;
    console.log(location);
   
    //component가 생성될 때 한번만 코드를 실행하려면 useEffect 사용
    useEffect(()=>{
        (async () => {
            const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json() 
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            
            setInfo(infoData);
            setPrice(priceData);
        
        })();
   },[]);
 




    //state : 
    // coins 화면을 통하지 않으면 에러가 남.
    // 그래서 state 뒤에 ?를 붙임.
    // state가 존재하면 , state.name을 가져오고 아니면 loading..을 띄운다.
 
    return (
        <Container>
        <Header>
            <Title> { state?.name || "Loading.." }</Title>
        </Header>
        { isLoading ? 
            (<Loader>is Loading...</Loader> )
            : (
                    null           
            )
        }
        </Container>  
    );
}

export default Coin;