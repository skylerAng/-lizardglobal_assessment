import Posts from "../../components/posts/Posts"
import "./home.scss"

const Home = (props) => {
  return (
    <div className="home">
      <Posts 
        postData={props.data}
        visible={props.visible}
        handleSetVisible={props.handleSetVisible}
      />
    </div>
  )
}

export default Home