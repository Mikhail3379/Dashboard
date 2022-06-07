import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Checkbox from "./checkbox";
import "./DashboardAssetsdata.css";
import btcLogo from "../../assets/coins/bitcoin_black_and_white.svg";
import solanaLogo from "../../assets/coins/solana_black_and_white.svg";
import rayLogo from "../../assets/coins/ray_black_and_white.svg";
import usdcLogo from "../../assets/coins/usdc_black_and_white.svg";
import { FiTrendingUp } from "@react-icons/all-files/fi/FiTrendingUp";
import { FiTrendingDown } from "@react-icons/all-files/fi/FiTrendingDown";
export default function Portfolios() {
  const [isCheckedA, setIsCheckedA] = useState(false);
  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedA(e.target.checked);
  };

  const [isCheckedB, setIsCheckedB] = useState(false);
  const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedB(e.target.checked);
  };
  const history = useHistory();
  function goToPortfolioPage() {
    history.push("/nova/portfolio");
  }
  return (
    <div className="portfolios">
      <div className="port-top">
        <div className="port-top-right">
          <button className="port-top-right-btn">$76.46</button>
          <button className="port-top-right-btn">$125.87</button>
          <button className="port-top-right-btn">$286.12</button>
          <button className="port-top-right-btn">$286.12</button>
          <button className="port-top-right-btn">$286.12</button>
          <button className="port-top-right-btn">$357.21</button>
        </div>
      </div>
      <div className="portfolio-list">
        <h1>Portfolios</h1>
        <p>
          This is the list of your portfolios. Click on one of them to view full
          details.
        </p>
        <button className="btn2" onClick={goToPortfolioPage}>
          + Create a portfolio
        </button>
        <Checkbox
          handleChange={handleChangeA}
          isChecked={isCheckedA}
          label="Show joined portfolios"
        />
        <Checkbox
          handleChange={handleChangeB}
          isChecked={isCheckedB}
          label="Show created portfolios"
        />

        <div className="sch"></div>
        <table className="tb">
          <tr>
            <th>
              &nbsp;&nbsp;Name & creator
              <button className="btn btnSearch">
                <FaSearchDollar className="explorerIcon" />
              </button>
              <input
                type="text"
                name="search"
                className="search1"
                placeholder="Search"
                // onChange={handleChange}
              ></input>
            </th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assets</th>
            <th>Investors</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;Yield</th>
            <th>Performance</th>
          </tr>
          <tr className="tr">
            <td>Bullrun Alpha by me</td>
            <td>
              {" "}
              <img className="assetLogo" src={btcLogo} />
              &nbsp;
              <img className="assetLogo" src={solanaLogo} />
            </td>
            <td>230</td>
            <td>+45%</td>
            <td>
              <FiTrendingUp />
            </td>
          </tr>
          <tr className="tr">
            <td>Portfolio87 by Cryptodealer</td>
            <td>
              <img className="assetLogo" src={usdcLogo} />
              &nbsp;
              <img className="assetLogo" src={rayLogo} />
              &nbsp;
              <img className="assetLogo" src={solanaLogo} />
              &nbsp; +5 more
            </td>
            <td>198</td>
            <td>+93%</td>
            <td>
              <FiTrendingUp />
            </td>
          </tr>

          <tr className="tr">
            <td>MyPortfolio81 by Creatorname</td>
            <td>
              {" "}
              <img className="assetLogo" src={solanaLogo} />
              &nbsp;
              <img className="assetLogo" src={btcLogo} />
            </td>
            <td>673</td>
            <td>+17.9%</td>
            <td>
              <FiTrendingUp />
            </td>
          </tr>
          <tr className="tr">
            <td>HelloWorld by Cryptodealer</td>
            <td>
              <img className="assetLogo" src={usdcLogo} />
              &nbsp;
              <img className="assetLogo" src={rayLogo} />
              &nbsp;
              <img className="assetLogo" src={solanaLogo} />
            </td>
            <td>37</td>
            <td>-0.9%</td>
            <td>
              <FiTrendingDown />
            </td>
          </tr>
          <tr className="tr">
            <td>TestingTest by Cryptodealer</td>
            <td>
              {" "}
              <img className="assetLogo" src={btcLogo} />
              &nbsp;
              <img className="assetLogo" src={solanaLogo} />
            </td>
            <td>837</td>
            <td>+45%</td>
            <td>
              <FiTrendingUp />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
