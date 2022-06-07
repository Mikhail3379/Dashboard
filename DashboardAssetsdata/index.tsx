import React, { Component, useEffect, useState } from "react";
import "./DashboardAssetsdata.css";
import { SERVER_URLCoin, SERVER_URL, SERVER_URLAnaytics } from "../utils";
import PortfolioDetails from "../../pages/PortfolioDetails";
import { WalletsTypes, PORTFOLIO_PROGRAMM_ID } from "../WalletUtils";
import axios from "axios";
import store from "../../redux/store";
import {  HashRouter, NavLink, Route, useHistory, useLocation } from "react-router-dom";
import CustomSelect from "../../components/CustomSelect";
import { clusterApiUrl } from "../../config/configCluster";
import loadingAnimation from "../../assets/loadingAnimation.svg";
import { userPortfolioLayout } from "../LayoutPortfolios/UserPortfolioLayout";
import AddStep from "../../components/CreationAssetSteps/AddStep";
import type { IData, IGroupedData } from "./types";
import { BarChart } from "./BarChart";
// import {Tabs} from "./Tabs";
import * as echarts from 'echarts';

// import ReactEcharts from "echarts-for-react"; 
import ReactECharts from 'react-echarts-resizable';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Container, Nav, Navbar } from "react-bootstrap";
import {Line} from 'react-chartjs-2';
import Overview from "./Overview";
import Portfolios from "./Portfolios";
import Tabs from "./Tabs";
import Tab from "./Tab";
import DepositedAssets from "./DepositedAssets";
import AvaliableBalance from "./AvaliableBalance";
const BAR_CHART_DATA: IData[] = [
  { label: "$76.46", value: 20 },
  { label: "$125.87", value: 30 },
  { label: "$286.12", value: 65 },
  { label: "$286.12", value: 65 },
  { label: "$286.12", value: 65 },
  { label: "$357.21", value: 100 }
];

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

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
export default function DashboardAssetsdata() {
  const [detailsPortfolio, setDetailsPortfolio] = useState(undefined);
  const [portfolioValues, setPortfolioValues] = useState(undefined);
  const [totalAmount, setTotalAmount]: any = useState(undefined);
  const [firstPortfolioDetails, setFirstPortfolioDetails] = useState(undefined);
  const [portfolioJSON, setPortfolioJSON] = useState({});
  const [portfolios, setPortfolios] = useState([]);
  const [solanaAccount] = useState(store.getState().account);
  const history = useHistory();
  const [walletType] = useState(store.getState().walletType.name);
  const [options, setOptions] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingAmount, setisLoadingAmount] = useState(true);
  const location = useLocation();
  const [defaultPortfolio, setDefaultPortfolio] = useState(undefined);
  //@ts-ignore
  const [createdPortPath] = useState(
    //@ts-ignore
    location.state ? location.state.createdPortPath : ""
  );

  function solanaConnect() {
    if (!solanaAccount) {
      history.push("/ConnectAccount");
      return;
    }
    getUserPortfolioInvest(PORTFOLIO_PROGRAMM_ID, solanaAccount.adress);
  }

  useEffect(() => {
    if (walletType === WalletsTypes.METAMASK) {
      //metamaskConnect();
    } else if (
      walletType === WalletsTypes.SOLANA ||
      walletType === WalletsTypes.PHANTOM ||
      walletType === WalletsTypes.SOLFRARE ||
      walletType === WalletsTypes.SLOPE ||
      walletType === WalletsTypes.SOLONG ||
      walletType === WalletsTypes.BITKEEP ||
      walletType === WalletsTypes.CLOVER ||
      walletType === WalletsTypes.MATHWALLET
    ) {
      solanaConnect();
    } else {
      history.push("/ConnectAccount");
    }
  }, []);

  useEffect(() => {
    let portfolio: any = localStorage.getItem("portfolio");
    portfolio = portfolio ? JSON.parse(portfolio) : {};
    let addressP = portfolio.address;
    getPPmTotalValueInvested(addressP);
  }, [portfolioValues]);

  async function getPPmTotalValueInvested(ppmAddress: any): Promise<any> {
    axios
      .get(SERVER_URLAnaytics + "/listPortfolioData?ppm=" + ppmAddress)
      .then((response: any) => {
        setTotalAmount(
          response && response.data
            ? nFormatter(response.data.valuePortfolio, 1)
            : "0"
        );
        setTimeout(() => {
          setisLoadingAmount(false);
        }, 2000);
      })
      .catch((error: any) => {
        setisLoading(false);
        console.log(error);
      });
  }

  function nFormatter(num: any, digits: any) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function(item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  async function getAmountByAddress(amount: any, idCoin: String): Promise<any> {
    let convert_amount: any;
    return new Promise<any>((resolve, reject) => {
      axios
        .get(SERVER_URLCoin + "/" + idCoin + "/ohlcv/today")
        .then((response: any) => {
          if (response.data && response.data[0]) {
            resolve(
              (convert_amount = response.data[0].close * parseFloat(amount))
            );
          } else {
            resolve((convert_amount = 260));
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  function getUserPortfolioInvest(programId: any, addresses: any) {
    let filter = [
      {
        //@ts-ignore
        memcmp: {
          offset: 1,
          bytes: addresses,
        },
      },
    ];
    let address = {
      jsonrpc: "2.0",
      id: 1,
      method: "getProgramAccounts",
      params: [
        programId,
        {
          filters: filter,
          encoding: "base64",
        },
      ],
    };
    let listAllPortfolioDetail: any[] = [];
    let listAllPortfolioPubKey: any[] = [];

    let network = store.getState().network.name;
    axios
      //@ts-ignore
      .post(clusterApiUrl(network), address)
      .then((response: any) => {
        if (response.data.result != undefined) {
          for (let i = 0; i < response.data.result.length; i++) {
            let result = userPortfolioLayout(
              response.data.result[i].account.data[0]
            );

            if (result.type_account == 1) {
              listAllPortfolioDetail.push(result);
              listAllPortfolioPubKey.push({
                address: result.portfolio_address,
              });
            }
          }

          //@ts-ignore
          setPortfolios(listAllPortfolioDetail);
          getAllPortfoliosDetailsFromBackendInvest(listAllPortfolioPubKey);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function getAllPortfoliosDetailsFromBackendInvest(addresses: any) {
    axios
      .post(`${SERVER_URL}/getAllPortfoliosDetails`, addresses)
      .then((response: any) => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
        }
        //@ts-ignore
        setPortfolioJSON(response.data);

        var mergedData: any = [];

        Object.keys(response.data).map((i) => {
          mergedData.push({ portfolioAddress: i, ...response.data[i] });
        });

        var list: any = [];
        //@ts-ignore
        mergedData.forEach((element) => {
          var obj = { value: element, label: element.PortfolioName };
          list.push(obj);
        });

        let listOptions = list.filter((item: any) => {
          return item.label != defaultPortfolio;
        });

        if (mergedData) {
          setFirstPortfolioDetails(mergedData[0]);
          setDetailsPortfolio(mergedData[0]);
        }
        let routeState: any = localStorage.getItem("routeState");
        if (routeState) {
          routeState = JSON.parse(routeState);
          setDetailsPortfolio(routeState.portfolio);
          let defaultPortfolio: any = {
            label: routeState.portfolio.PortfolioName,
            value: routeState.portfolio,
          };
          let defPortfolio =
            createdPortPath == "PortfolioCreated"
              ? defaultPortfolio
              : listOptions[0];
          setDefaultPortfolio(defPortfolio);
          choosePortfolio(defPortfolio);
        }

        setOptions(listOptions);
        setisLoading(false);
      });
  }

  function choosePortfolio(selectedOption: any) {
    //@ts-ignore
    setDetailsPortfolio(null);
    if (selectedOption) {
      localStorage.setItem("portfolio", JSON.stringify(selectedOption.value));
    }

    setisLoadingAmount(true);
    setTotalAmount("--");
    setTimeout(() => {
      if (selectedOption) {
        var routeState: any = location.state ? location.state : {};
        routeState.portfolio = selectedOption.value;
        routeState.portfolioDetail = selectedOption.value;
        localStorage.setItem("routeState", JSON.stringify(routeState));
        setPortfolioValues(selectedOption.value);
        setDetailsPortfolio(selectedOption.value);
      }
    }, 100);
  }

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

  

 

  const renderPortfolioItems = () => {
    if (options.length === 0) {
      return (
     
        // <div id="div-btn">
        
        //   <p className="noDataMessage">participate in your first portfolio</p>;
        //   <button className="btn2" onClick={goToPortfolioPage} ><span className="text-btn2">Go to Portfolio Page</span></button>
        // </div>
        //   <div className="AddStepComponent">
        //     {/*  <select name="sort" id="sort" className="rt-select sort">
        //   <option selected disabled hidden>
            
        //   </option>
        //   <option value="">option 1</option>
        //   <option value="">option 2</option>
        // </select> */}
        //     {/* <input
        //       type="text"
        //       name="search"
        //       className="sr-input search"
        //       placeholder="Search"
        //       // onChange={handleChange}
        //     /> */}
        //    
        //   </div>
  
     
   
 
  <div >
  <Tabs >
      <Tab title="Overview"><Overview/></Tab>
      <Tab title="Portfolios"><Portfolios/></Tab>
      <Tab title="Deposited assets"><DepositedAssets/></Tab>
      <Tab title="Avaliable balance"><AvaliableBalance/></Tab>
    </Tabs>
  </div>
      );
    }
    return (
      <div>
        {!detailsPortfolio && firstPortfolioDetails && options.length > 0 ? (
          <PortfolioDetails
            portfolio={firstPortfolioDetails}
            path={"dashboard"}
          />
        ) : (
          <></>
        )}

        {detailsPortfolio && options.length > 0 ? (
          <PortfolioDetails portfolio={detailsPortfolio} path={"dashboard"} />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className="DashboardAssetsdataPage">
      <div className="PortofolioHome">
        <div className="topPortfolio">
          <div className="actionHead">
            {//@ts-ignore
            options.length > 0 ? (
              <div>
                <h2 style={{ marginBottom: "10px" }}> My Investments</h2>
                <CustomSelect
                  handleChange={choosePortfolio}
                  defaultPortfolio={defaultPortfolio}
                  data={options}
                />
              </div>
            ) : (
              <></>
            )}
            {!isLoading && options.length > 0 ? (
              !isLoadingAmount ? (
                totalAmount !== undefined && options.length !== 0 ? (
                  <div className="headerPortfolioDetailsPage divAmount">
                    <h2 className="headerPortfolioDetailsPage hlabel">
                      Portfolio Value:{" "}
                    </h2>
                    <h2
                      className="headerPortfolioDetailsPage hAmount"
                      style={{ color: "#7efbc1", marginLeft: "5px" }}
                    >
                      {" "}
                      {totalAmount ? totalAmount : 0} ${" "}
                    </h2>
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <div className="headerPortfolioDetailsPage divAmount">
                  <h2 className="headerPortfolioDetailsPage hlabel">
                    Portfolio Value
                  </h2>
                  <img
                    src={loadingAnimation}
                    alt="loading animation"
                    className="loadingAmountImage headerPortfolioDetailsPage labelAmountLoading"
                  />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
          <div className="mainContent" style={{ marginTop: "-40px" }}>
            {isLoading ? (
              <img
                src={loadingAnimation}
                alt="loading animation"
                className="loadingImage"
              />
            ) : (
              renderPortfolioItems()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
