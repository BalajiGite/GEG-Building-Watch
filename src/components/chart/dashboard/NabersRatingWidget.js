import React, { useState, useEffect } from "react";
import { Spin, Card,Table } from "antd";
import nabersLogo from "../../../assets/images/energy/nabers/NABERS_Logo.svg";
import nabers1 from "../../../assets/images/energy/nabers/Star_1.svg";
import nabers2 from "../../../assets/images/energy/nabers/Star_2.svg";
import nabers3 from "../../../assets/images/energy/nabers/Star_3.svg";
import nabers4 from "../../../assets/images/energy/nabers/Star_4.svg";
import nabers5 from "../../../assets/images/energy/nabers/Star_5.svg";
import nabers6 from "../../../assets/images/energy/nabers/Star_6.svg";

const NabersRatingWidget = (jsonData) => {
  const [nabersRatings, setNabersRatings] = useState(null);
 
  const fetchData = async (jsonData) => {
    const objNabersData = {
      zeroOne: 0,
      oneTwo: 0,
      twoThree: 0,
      threeFour: 0,
      fourFive: 0,
      fiveSix: 0,
    };
    const updateNabersData = (data, obj) => {
      data.jsonData.forEach(item => {
          if (item.rating >= 0 && item.rating < 1) {
              obj.zeroOne += 1;
          } else if (item.rating >= 1 && item.rating < 2) {
              obj.oneTwo += 1;
          } else if (item.rating >= 2 && item.rating < 3) {
              obj.twoThree += 1;
          } else if (item.rating >= 3 && item.rating < 4) {
              obj.threeFour += 1;
          } else if (item.rating >= 4 && item.rating < 5) {
              obj.fourFive += 1;
          } else if (item.rating >= 5 && item.rating <= 6) {
              obj.fiveSix += 1;
          }
      });
  
      return obj;
    };

    const updatedNabersData = updateNabersData(jsonData, objNabersData);
    setNabersRatings(updatedNabersData);
  };

  useEffect(() => {
    fetchData(jsonData);
  }, [jsonData]);

  return (
    <Card className="custom-card" style={{ width: "100%", marginBottom:20 }}>
    <div className="nabers-widget">
      <div className="logo-container">
        <img src={nabersLogo} alt="NABERS Ratings" />
      </div>
      <div className="table-container">
        <table className="ratings-table">
          <thead>
            <tr>
              {nabersRatings && (
                <>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers1} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers2} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers3} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers4} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers5} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                  <th>
                    <div className="parent-grid">
                      <img src={nabers6} alt="NABERS Ratings" />
                      <div className="dotted-vertical-line"></div>
                    </div>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {nabersRatings && (
                <>
                  <td>
                    <p className="rating-text">
                      <span>
                        (0-1)
                        <br />
                        Poor
                        <br />
                        {nabersRatings.zeroOne + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="rating-text">
                      <span>
                        (1-2)
                        <br />
                        Below Average
                        <br />
                        {nabersRatings.oneTwo + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="rating-text">
                      <span>
                        (2-3)
                        <br />
                        Average
                        <br />
                        {nabersRatings.twoThree + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="rating-text">
                      <span>
                        (3-4)
                        <br />
                        Good
                        <br />
                        {nabersRatings.threeFour + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="rating-text">
                      <span>
                        (4-5)
                        <br />
                        Excellent
                        <br />
                        {nabersRatings.fourFive + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="rating-text">
                      <span>
                        (5-6)
                        <br />
                        Market Leaders
                        <br />
                        {nabersRatings.fiveSix + " Buildings"}
                        <br />
                        found
                      </span>
                    </p>
                  </td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </Card>
  );
};

export default NabersRatingWidget;
