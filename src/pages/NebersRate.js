import { Col, Rate } from "antd";
import React, { useState } from "react";

function NebersRate() {
  const [rating, setRating] = useState();

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    console.log(`the new value is ${newValue}`);
  };
  return (
    <>
      <Col span={5} style={{ textAlign: "center" }}>
        <Rate
          className="rate-stars"
          allowClear={false}
          allowHalf
          count={6}
          // onHoverChange={handleRatingChange}
          // onFocus={handleOnFocus}
          value={rating}
          onChange={handleRatingChange}
          style={
            (rating > 0) & (rating <= 2)
              ? { color: "red", fontSize: 15 }
              : (rating < 4) & (rating > 2)
              ? { color: "orange", fontSize: 15 }
              : rating >= 4
              ? { color: "green", fontSize: 15 }
              : { color: "yellow", fontSize: 15 }
          }
        />
      </Col>
    </>
  );
}

export default NebersRate;
