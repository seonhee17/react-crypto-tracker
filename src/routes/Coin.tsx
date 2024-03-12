/* import { useEffect, useState } from "react"; */

import { styled } from "styled-components";
import { Routes, Route, useParams,useLocation } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
/* import { useQuery } from "@tanstack/react-query"; */
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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
/* Object.keys : 키값
Object.value : 값
command + D : 선택한것과 같은것 선택하기
command + Shift + L : 선책한 것과 같은 것의 다중 커서 ㄴ생성 */


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

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
    
    
    /* const [loading , setLoading] = useState(true);
    const [info , setInfo] = useState<InfoData>();
    const [priceInfo , setPriceInfo] = useState<PriceData>(); */
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;
    console.log(location);
   
   
  /*   component가 생성될 때 한번만 코드를 실행하려면 useEffect 사용
    react-query를 사용하는 첫 단계는
     fetcher 함수를 만들어야한다.
     fetcher 함수란?
     await fetch 부분 임.
     api.ts 생성
     fetch함수 는  promise 부분을 반드시 리턴해야한다. */


    /* 리액트 쿼리 사용 시 없어지는 곳 */ 
   /*  useEffect(()=>{
        (async () => {
            const infoData = await(await fetch(`https:api.coinpaprika.com/v1/coins/${coinId}`)).json() 
            console.log(infoData);
            const priceData = await(await fetch(`https:api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(priceData);
            
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        
        })();
   },[coinId]); */
   /* 리액트 쿼리 사용 시 없어지는 곳 */ 

   /* 리액트 쿼리 사용 */
   const { isLoading: infoLoading, data: infoData } = useQuery({
      queryKey : ["info", coinId],
      queryFn : ()=> fetchCoinInfo(`${coinId}`),
    });
    const { isLoading: tickersLoading, data: tickersData } = useQuery({
      queryKey : ["price", coinId],
      queryFn : ()=> fetchCoinTickers(`${coinId}`),
     });

     const loading = infoLoading || tickersLoading;


   /* 리액트 쿼리 사용 */




   /* [] 처음 실행하고 싶을때는 useEffect 끝에  [] 붙인다.
   하지만 hooks 는 우리가 최적의 성능을 위해 hooks 안에 사용한 어떤 것이든  [] 안에 넣어줘야한다고,
   dependancy를 넣어햐한다고 한다.
   [coinId] coinId가 변할 때마다 useEffect 실행 
   url에 coinId가 변경되기 때문에 컴포넌트안에서는 안변한다.

    state : 
     coins 화면을 통하지 않으면 에러가 남.
     그래서 state 뒤에 ?를 붙임.
     state가 존재하면 , state.name을 가져오고 아니면 loading..을 띄운다. */
 
    return (
        <Container>
        <Header>
            <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </Title>
        </Header>
        {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          {/* Nested router 혹은 Nested route는 route안에 있는 또다른 route이다.
           탭사용시 용의
           스크린안에 많은 섹션이 있는 곳도 유형
           btc/price
           btc/chart
           파라미터로 상태를 표시하고 싶을때  */}
          <Routes>
            <Route path={`/${coinId}/price`} element={ <Price />} />
            <Route path={`/${coinId}/chart`} element={ <Chart isDark={isDark} ={coinId} />} />
         </Routes>
        </>
      )}
        </Container>  
    );
}

export default Coin;
