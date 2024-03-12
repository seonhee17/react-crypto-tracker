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
//Object.keys : 키값
//Object.value : 값
//command + D : 선택한것과 같은것 선택하기
//command + Shift + L : 선책한 것과 같은 것의 다중 커서 ㄴ생성


interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }

/* react-router-dom v6 부터 제네릭을 지원하지 않습니다.

interface RouterState {
name: string;
}

const location = useLocation();
const name = location.state as RouterState; */

function Coin(){
    
    const [isLoading , setLoading] = useState(true);
    const [info , setInfo] = useState<InfoData>();
    const [price , setPrice] = useState<PriceData>();
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;
    console.log(location);
   
    //component가 생성될 때 한번만 코드를 실행하려면 useEffect 사용
    useEffect(()=>{
        (async () => {
            const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json() 
            //console.log(infoData);
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            //console.log(priceData);
            
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