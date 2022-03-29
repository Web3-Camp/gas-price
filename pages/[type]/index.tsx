import {ReactNode, useEffect, useState} from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import {Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import EchartsLine from "../components/echartsLine";
import {ethers} from 'ethers';

const Box = styled.div`
  .firstLine{
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px;
    color: rgba(0,0,0,0.4);
    font-size: 12px;
  }
  .title{
    color: rgba(0,0,0,0.4);
    font-size: 12px;
    text-align: center;
  }
  .number{
    text-align: center;
    font-size: 24px;
    font-weight: bolder;
    padding-top: 5px;
    color: #000000;
  }
`
const EchartsBox = styled.div`
    margin: 40px 0;
    
`

interface maticObj{
    fast: {
        price:number
    };
    slow: {
        price:number
    };
    normal:{
        price:number
    }
}

export default function TypeLine<NextPage>()  {
    const router = useRouter();
    const {type} = router.query;

    const [info,setInfo] = useState<maticObj|null>(null);
    const [time,setTime] = useState<number>(10);
    const [averArr, setAverArr] = useState<number[]>([])
    const [timeArr, setTimeArr] = useState<string[]>([])

    let timer:any
    useEffect(()=>{
        setAverArr([])
        setTimeArr([])
        const getMatic = async() =>{
            const result = await axios({
                method: 'get',
                url: `https://api.debank.com/chain/gas_price_dict_v2?chain=${type}`
            });
            console.log("==result.data.data======",result.data.data)
            setInfo(result.data.data);
        }
        getMatic()
        let t = 10
        timer = setInterval(()=>{
            if(t){
                t--
                setTime(t);
            }else{
                t = 10;
                getMatic()
            }
        },1000)

        return ()=> clearInterval(timer);

    },[type])

    useEffect(()=>{
        if(info==null)return;
        const { normal:{price} } = info;
        const pri = format(price)
        const arr = [...averArr];
        arr.push(price)
        setAverArr(arr);
        const tArr = [...timeArr];
        const newtime = new Date().toLocaleTimeString();
        tArr.push(newtime)
        setTimeArr(tArr);
    },[info])

    const format = (number:number) =>{
       return  ( Number(number) / 10 ** 9).toFixed(1)
        // return ethers.utils.formatEther(num)
    }
    return (
        <>
            <Box>
                <div className="firstLine">
                    <div>
                        Next update in {time}s
                    </div>
                    <div>
                        <img src="" alt=""/>
                    </div>
                </div>
                <Row>
                    <Col md={4} xs={12}>
                        <Card body>
                            <div className="title">Fast</div>
                            <div className="number">{format(info?.fast.price??0)}</div>
                        </Card>
                    </Col>
                    <Col md={4} xs={12}>
                        <Card body>
                            <div className="title">Standard</div>
                            <div className="number">{format(info?.normal.price??0)}</div>
                        </Card>
                    </Col>
                    <Col md={4} xs={12}>
                        <Card body>
                            <div className="title">Low</div>
                            <div className="number">{format(info?.slow.price??0)}</div>
                        </Card>
                    </Col>
                </Row>
                <EchartsBox>
                    <EchartsLine data={averArr} timeData={timeArr}/>
                </EchartsBox>
            </Box>


        </>
    )
}



interface LayoutProps {
    children: ReactNode;
}

TypeLine.getLayout = function getLayout(page:LayoutProps) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}