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
export default function DepositedAssets() {
  const history = useHistory();
  function goToPortfolioPage() {
    history.push("/nova/portfolio");
  }
  return (
    <div className="deposited-assets">
      <div className="da-top">
        <table>
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
      <div className="portfolio-list">
        <h1>Deposited Assets</h1>
        <p>
          This is the list of all your assets that are currently in a portfolio.
        </p>

        <div className="sch"></div>
        <table className="tb1">
          <tr>
            <th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asset
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
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balance</th>
            <th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tag
            </th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Distribution</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total $1,126.43</th>
          </tr>
          <tr className="tr1">
            <td>
              <b>USD Coin</b>
              <br />
              USDC
            </td>
            <td>
              $878.23
              <br />
              879.35
            </td>
            <td>
              <button className="stablecoin">Stablecoin</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>
          <tr className="tr1">
            <td>
              <b>Wrapped Bitcoin</b>
              <br />
              WBTC
            </td>
            <td>
              $48.00
              <br />
              0.000019
            </td>
            <td>
              <button className="mature-crypto">Mature crypto</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>

          <tr className="tr1">
            <td>
              <b>Wrapped Solana</b>
              <br />
              WSOL
            </td>
            <td>
              $130.12
              <br />
              1.71
            </td>
            <td>
              <button className="mature-crypto">Mature crypto</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>
          <tr className="tr1">
            <td>
              <b>Raydium</b>
              <br />
              RAY
            </td>
            <td>
              $70.08
              <br />
              30.17
            </td>
            <td>
              <button className="altcoin">Altcoin</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>
          <tr className="tr1">
            <td>
              <b>Token</b>
              <br />
              TKN
            </td>
            <td>
              $130.12
              <br />
              1.71
            </td>
            <td>
              <button className="mature-crypto">Mature crypto</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>
          <tr className="tr1">
            <td>
              <b>Token2</b>
              <br />
              TKN2
            </td>
            <td>
              $878.23
              <br />
              879.35
            </td>
            <td>
              <button className="stablecoin">Stablecoin</button>
            </td>
            <td>View portfolios</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div className="avaliable-balance">
        <h1>Available Balance</h1>
      </div>
    </div>
  );
}
