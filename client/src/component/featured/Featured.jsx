import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredtop">
        <h1 className="featuredtitle">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="featuredbottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="featuredcharttitle">Total sales made today</p>
        <p className="featuredamount">$420</p>
        <p className="featureddesc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="featuredsummary">
          <div className="featureditem">
            <div className="featureditemTitle">Target</div>
            <div className="featureditemResult featurednegative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="featuredresultAmount">$12.4k</div>
            </div>
          </div>
          <div className="featureditem">
            <div className="featureditemTitle">Last Week</div>
            <div className="featureditemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="featuredresultAmount">$12.4k</div>
            </div>
          </div>
          <div className="featureditem">
            <div className="featureditemTitle">Last Month</div>
            <div className="featureditemResult featuredpositive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="featuredresultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
