import Post from "../post/Post";
import "./posts.scss";



const Posts = (props) => {
  //TEMPORARY
  const showMoreItems = () => {
    props.handleSetVisible(prevValue => prevValue + 5);
  }
  const posts = props.postData;

  return <div className="posts">

  {posts.slice(0,props.visible).map(post=>(
 
    <Post 
      post={post} 
      key={post.id}
      author={post.author}
      categories={post.categories}
      publishDate={post.publishDate}
      summary={post.summary}
      title={post.title}
    />
  ))}
  <button 
    onClick={showMoreItems}
  >Load More</button>
</div>;
};

export default Posts;
