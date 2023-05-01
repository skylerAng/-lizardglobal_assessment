import "./profile.scss";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TitleIcon from '@mui/icons-material/Title';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DateConverter from "../../components/dateconverter/DateConverter"
import CategoryIcon from '@mui/icons-material/Category';

const Profile = (props) => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const uniqueCategories = new Set();

  const categoryColors = {
    "Data Management": "#0077B5",
    "Digital Marketing": "#FFC107",
    "Ecommerce": "#FF5722",
    "Email Marketing": "#8E44AD",
    "Landing Pages": "#4CAF50",
    "Marketing Automation": "#3F51B5",
    "Marketing Analytics": "#E91E63",
    "Platform News and Updates": "#689F38",
    "Surveys and Forms": "#D81B60",
    "Tips and Best Practise": "#03A9F4",
    // add more category-color mappings as needed
  };
  
  const getData = (id) => {
    fetch('/api/posts/')
      .then((response) => response.json())
      .then((jsonData) => {
        const filteredData = jsonData.posts.filter((post) => post.id === id);
        setProfileData(filteredData[0]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    getData(id);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="images">
        <img
          src={profileData.author.avatar}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <SummarizeIcon />
            {profileData.summary}
          </div>
          <div className="center">
            <span>{profileData.author.name}</span>
            <div className="info">
              <div className="item">
                <AccessTimeIcon />
                <span>  <DateConverter date={profileData.publishDate} /></span>
              </div>
              <div className="item">
                <TitleIcon />{profileData.publishDate}
              </div>
            </div>
            
            <p><CategoryIcon />
              {profileData.categories.map((item) => {
                if (uniqueCategories.has(item.name)) {
                  return null; // skip rendering duplicate category
                }
                uniqueCategories.add(item.name);
                return (
                  <div
                    key={item.name} // use category name as key
                    className="item"
                    style={{ color: categoryColors[item.name] }}
                  >
                    {item.name}
                  </div>
                );
              })}</p>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
