import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";

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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
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
    
    const [loading , setLoading] = useState(true);
    const [info , setInfo] = useState<InfoData>();
    const [priceInfo , setPriceInfo] = useState<PriceData>();
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
            setPriceInfo(priceData);
            setLoading(false);
        
        })();
   },[coinId]);
   //[] 처음 실행하고 싶을때는 useEffect 끝에  [] 붙인다.
   //하지만 hooks 는 우리가 최적의 성능을 위해 hooks 안에 사용한 어떤 것이든  [] 안에 넣어줘야한다고,
   //dependancy를 넣어햐한다고 한다.
   //[coinId] coinId가 변할 때마다 useEffect 실행 
   //url에 coinId가 변경되기 때문에 컴포넌트안에서는 안변한다.

    //state : 
    // coins 화면을 통하지 않으면 에러가 남.
    // 그래서 state 뒤에 ?를 붙임.
    // state가 존재하면 , state.name을 가져오고 아니면 loading..을 띄운다.
 
    return (
        <Container>
        <Header>
            <Title>
            {state?.name ? state.name : loading ? "Loading..." : info?.name}
            </Title>
        </Header>
        {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          //Nested router 혹은 Nested route는 route안에 있는 또다른 route이다.
          // 탭사용시 용의
          // 스크린안에 많은 섹션이 있는 곳도 유형
          // btc/price
          // btc/chart
          // 파라미터로 상태를 표시하고 싶을때 
          <Routes>
            <Route path={`/${coinId}/price`} element={ <Price />} />
            <Route path={`/${coinId}/chart`} element={ <Chart />} />
         </Routes>
        </>
      )}
        </Container>  
    );
}

export default Coin;