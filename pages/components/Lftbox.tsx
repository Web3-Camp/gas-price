import React from "react";
import styled from 'styled-components';
import Link from "next/link";
import {useRouter} from "next/router";

const UlLft = styled.ul`
  padding: 0;
  li{
    display: flex;
    align-content: center;
    margin-bottom:10px;
    padding:10px 20px;
    .lft{
      margin-right: 10px;
      img{
        width: 20px;
      }
    }
    .rht{
      line-height: 1.8em;
    }
    a{
      text-decoration: none;
      color: #666666;
    }
    &:hover,&.active{
      background: #f8f8f8;
      border-radius: 8px;
    }
  }
`

export default function LeftBox() {
    const router = useRouter();
    const {asPath } = router
    console.log("=========router=====",router)
    return <div>
        <UlLft>
            <li className={ asPath==='/'?'active':''}>
                <span className="lft"><img src="/assets/images/eth.png" alt=""/></span>
                <span className="rht"><Link href='/'>Ethereum</Link></span>
            </li>
            <li className={ asPath==='/matic'?'active':''}>
                <span className="lft"><img src="/assets/images/matic.png" alt=""/></span>
                <span className="rht"><Link href='/matic'>Matic</Link></span>
            </li>
            <li className={ asPath==='/bsc'?'active':''}>
                <span className="lft"><img src="/assets/images/bnb.png" alt=""/></span>
                <span className="rht"><Link href='/bsc'>BSC</Link></span>
            </li>
            <li className={asPath==='/heco'?'active':''}>
                <span className="lft"><img src="/assets/images/heco.png" alt=""/></span>
                <span className="rht"><Link href='/heco'>HECO</Link></span>
            </li>
        </UlLft>
    </div>
}
