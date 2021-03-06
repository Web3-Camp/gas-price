import {ReactNode, useEffect, useState} from "react";
import Layout from "./components/layout";
import styled from "styled-components";
import {Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import EchartsLine from "./components/echartsLine";

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
    font-size: 30px;
    font-weight: bolder;
    padding: 10px 0;
    color: #000000;
  }
  .time{
    text-align: center;
    span{
      color: rgba(0,0,0,0.4);
      font-size: 12px;
      padding-left:5px;
    }
  }
`
const EchartsBox = styled.div`
    margin: 40px 0;
    
`

interface maticObj{
    blockNum:number|undefined;
    fastest:number|undefined;
    fast: number|undefined;
    safeLow: number|undefined;
    average: number|undefined;
    fastestWait: number|undefined;
    fastWait: number|undefined;
    avgWait: number|undefined;
    safeLowWait: number|undefined;
}

export default function Home<NextPage>()  {
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
                url: `https://ethgasstation.info/json/ethgasAPI.json`
            });
            console.log("==result.data.data======",result.data)
            setInfo(result.data);
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
        const { fastest } = info;
        const pri = format(fastest)
        const arr = [...averArr];
        arr.push(pri)
        setAverArr(arr);
        const tArr = [...timeArr];
        const newtime = new Date().toLocaleTimeString();
        tArr.push(newtime)
        setTimeArr(tArr);
    },[info])

    const format = (number:number|undefined) =>{
        const num = number ? number : 0
        return  (num / 10)
    }
    return (
        <>
            <Box>
                <div className="firstLine">
                    <div>
                        Next update in {time}s
                    </div>
                    <div>
                        block number:{info?.blockNum}
                    </div>
                </div>
                <Row>
                    <Col md={3} xs={12}>
                        <Card body>
                            <div className="title">Fastest</div>
                            <div className="number">{format(info?.fastest)}</div>
                            <div className="time">{info?.fastestWait}<span>min</span></div>
                        </Card>
                    </Col>
                    <Col md={3} xs={12}>
                        <Card body>
                            <div className="title">Fast</div>
                            <div className="number">{format(info?.fast)}</div>
                            <div className="time">{info?.fastWait}<span>min</span></div>
                        </Card>
                    </Col>
                    <Col md={3} xs={12}>
                        <Card body>
                            <div className="title">Average</div>
                            <div className="number">{format(info?.average)}</div>
                            <div className="time">{info?.avgWait}<span>min</span></div>
                        </Card>
                    </Col>
                    <Col md={3} xs={12}>
                        <Card body>
                            <div className="title">Safe</div>
                            <div className="number">{format(info?.safeLow)}</div>
                            <div className="time">{info?.safeLowWait}<span>min</span></div>
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

Home.getLayout = function getLayout(page:LayoutProps) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}