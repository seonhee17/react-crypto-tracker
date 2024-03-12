import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
/* import { useQuery } from "@tanstack/react-query";/*  */ 
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items : center;
`;

const CoinList = styled.ul``;
const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
    border: 1px solid white;
    a{
        display: flex;
        align-items: center;
        padding: 20px;
        transition : color 0.2s ease-in ;
    }
    &:hover {
        a{
            color: ${(props)=> props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`;
interface CoinInterface {
    id :string;
    name : string;
    symbol: string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type: string;
}

const Loader = styled.span`
    text-align: center;
`;

const Img = styled.img`
width :35px;
height: 35px;
margin-right: 10px;
`;

interface ICoinsProps {
    toggleDark: () => void;
  }
  
  function Coins({ toggleDark }: ICoinsProps) {
     //component가 처음 시작할 때만 작동하도록
   /* 리액트 쿼리 사용 시 없어지는 곳 */ 
   /*  
    const [coins ,setCoins] = useState<CoinInterface[]>([]);
    const [isLoading , setLoading] = useState(true);
    
     useEffect(()=>{
        (async()=> {
          const res =  await fetch("https://api.coinpaprika.com/v1/coins");
          const json = await res.json();
          setCoins(json.slice(0,100));
          setLoading(false);
        })();
    },[]); */
  /* 리액트 쿼리 사용 시 없어지는 곳 */ 
  
  /* 리액트 쿼리 사용 */

    //querykey query의 고유 식별자
    // Boolean인 로딩여부를  isLoading에 넣어줌.
    // 이쿼리 이름  allCoins
    const { isLoading , data } = useQuery<CoinInterface[]>({
        queryKey: ['allCoins'],
        queryFn: fetchCoins
      });

  /* 리액트 쿼리 사용 */




    //Link로 연결된 곳의 페이지에서  state로 가져다 쓸수 있ㄷ.
    //Coin.tsx 페이지서 가져다 쓰기
    let {state} = useLocation();

    //state 비하인드 더씬 방식  parameter를 사용해서 다른화면으로 
    return (
        <Container>
        <Header>
            <Title>Coins</Title>
            <button onClick={toggleDark}>Toggle Dark Mode</button>
        </Header>
        { isLoading ? 
            (<Loader>is Loading...</Loader> )
            :   
            (<CoinList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                       {/*  <Link to={`/${coin.id}`} >
                            <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}/>    
                            {coin.name} &rarr;</Link> */}
                        <Link    to={{ pathname :`/${coin.id}`, }} 
                              state={{  name : coin.name}} >
                            <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}/>    
                            {coin.name} &rarr;</Link>
                         {/*
                         <Link to="/course?sort=name"
                        Link 사용법
                        <Link  to={{
                             pathname:"/course",
                             search : "?sort=ame",
                             hash : "#the-hash",
                             }}
                             state = {{ fromDashboard : true }}   
                        /> */}


                    </Coin>
                ))}
            
            </CoinList>
            )
        }
        </Container>
    );
}

export default Coins;
