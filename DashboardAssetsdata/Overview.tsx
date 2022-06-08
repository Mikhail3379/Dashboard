import React from "react";
import "./DashboardAssetsdata.css";
import { BarChart } from "./BarChart";
import type { IData, IGroupedData } from "./types";
import { Container, Nav, Navbar } from "react-bootstrap";
import {Line} from 'react-chartjs-2';
import { useHistory } from "react-router-dom";
const BAR_CHART_DATA: IData[] = [
  { label: "$76.46", value: 20 },
  { label: "$125.87", value: 30 },
  { label: "$286.12", value: 65 },
  { label: "$286.12", value: 65 },
  { label: "$286.12", value: 65 },
  { label: "$357.21", value: 100 }
];

const state = {
    labels: ['$76.46', '$125.87', '$286.12', '$357.21'],
    datasets: [
      {
        label: 'Balance deposited',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'teal',
        borderColor: 'white',
        borderWidth: 2,
        data: [20, 30, 65, 100]
      }
    ]
  }
  export default function Overview() {
    const history = useHistory();
    function goToPortfolioPage() {
        history.push("/nova/portfolio");
      }
  const option = {
    xAxis: {
      type: 'category',
      data: ['$76.46', '$125.87', '$286.12', '$286.12', '$286.12', '$357.21']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [20, 30, 65, 65, 65, 100],
        type: 'bar'
      }
    ]
  }; 
    return (
        <div className="overview">
       
        <div className="overview-content">
          <h1 className="over">Overview</h1>
          <p className="this">This is the summary of the performance of your investments</p>
         
          {/* <Navbar className="navbarS" bg="dark" variant="dark"> */}
  <Container>
  
  <Nav className="me-auto">
    <Nav.Link href="#1D">1D</Nav.Link>
    <Nav.Link href="#1W">1W</Nav.Link>
    <Nav.Link href="#1M">1M</Nav.Link>
    <Nav.Link href="#1Y">1Y</Nav.Link>
  </Nav>
  </Container>
 

          <div className="options">
            <select className="option1">
              <option>My portfolio81</option>
              <option>My portfolio82</option>
              <option>My portfolio83</option>
            </select>
            <button className="btn btnView">View portfolio info</button>
          <button className="btn btnManage">Manage portfolio</button>
            </div>
            {/* <div className="container"> */}
            {/* <ReactECharts option={option1} /> */}
            <div className="line"> <Line
        data={state}
        options={{
          //@ts-ignore
          title:{
            display:true,
            text:'',
            fontSize:2
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
      </div>
    <section className="chart">
   
      
      <BarChart data={BAR_CHART_DATA} />
    </section>
   
 
        </div>
        <div className="portfolio-list">
          <h1>Portfolios</h1>
          <p>
            This is the list of your portfolios. Click on one of them to view
            full details.
          </p>
          <button className="btn2" onClick={goToPortfolioPage}>
            + Create a portfolio
          </button>
        </div>
       
      </div>
    );
    }
