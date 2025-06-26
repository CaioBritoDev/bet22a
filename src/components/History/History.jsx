import "./History.css";
import { useState } from "react";

const History = ({ arrayMultipliers }) => {
  const [showMore, setShowMore] = useState(false);
  const multipliersToShow = showMore ? arrayMultipliers.slice(0, arrayMultipliers.length) : arrayMultipliers.slice(0, 15);
  return (
    <div className="history">
      {multipliersToShow.map((multi, index) => (
        <div key={index} className="history-item">
          {multi}x
        </div>
      ))}
      <button id="show-more-button" onClick={() => setShowMore((current) => !current)}>
        {showMore ? "Ver menos" : "Ver tudo"}
      </button>
    </div>
  );
};

export default History;
