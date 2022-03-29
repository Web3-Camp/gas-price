import {ReactNode, useEffect, useState} from "react";
import Layout from "./components/layout";
import styled from "styled-components";
import {Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import EchartsLine from "./components/echartsLine";

const Box = styled.div`
    .firstLine{
      display: flex;
      justify-content: space-between;
      margin: 20px 5px 10px;
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
    blockNumber:number;
    fastest:number;
    fast: number;
    safeLow: number;
    standard: number;
}

export default function Matic<NextPage>()  {

    const [info,setInfo] = useState<maticObj|null>(null);
    const [time,setTime] = useState<number>(10);
    const [averArr, setAverArr] = useState<number[]>([])
    const [timeArr, setTimeArr] = useState<string[]>([])

    let timer:any
    useEffect(()=>{
        const getMatic = async() =>{
            const result = await axios({
                method: 'get',
                url: `https://gasstation-mainnet.matic.network/`,
                headers: {
                    accept: 'application/json',
                }
            });
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

    },[])

    useEffect(()=>{
        if(info==null)return;
        const { standard } = info;
        const arr = [...averArr];
        arr.push(standard)
        setAverArr(arr);
        const tArr = [...timeArr];
        const newtime = new Date().toLocaleTimeString();
        tArr.push(newtime)
        setTimeArr(tArr);
    },[info])

  return (
    <>
        <Box>
            <div className="firstLine">
                <div>
                    Next update in {time}s
                </div>
                <div>
                    block number:{info?.blockNumber}
                </div>
            </div>
            <Row>
                <Col md={3} xs={12}>
                    <Card body>
                        <div className="title">Fastest</div>
                        <div className="number">{info?.fastest}</div>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card body>
                        <div className="title">Fast</div>
                        <div className="number">{info?.fast}</div>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card body>
                        <div className="title">Standard</div>
                        <div className="number">{info?.standard}</div>
                    </Card>
                </Col>
                <Col md={3} xs={12}>
                    <Card body>
                        <div className="title">Low</div>
                        <div className="number">{info?.safeLow}</div>
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

Matic.getLayout = function getLayout(page:LayoutProps) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}