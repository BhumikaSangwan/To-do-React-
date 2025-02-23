import Todo from "./todo"


export default function App()
{
    return <Todo/>
    
}



















// import InfiniteScroll from "react-infinite-scroll-component";
// import {useState} from 'react';

// const App = () => {
//     const [dataSource, setDataSource] = useState(Array.from({length:40}))
//     const [hasMore, setHasMore] = useState(true);
//     const fetchMoreData = ()=>{
//         setDataSource(dataSource.concat(Array.from({length:40})))
//     }
//     return <div >
//         <InfiniteScroll dataLength={dataSource.length} next={fetchMoreData} hasMore={hasMore}>
//             {dataSource.map((item, index)=>{
//                 return <div>This is a div {index+1} inside infinite scroll</div>
//             })}
//         </InfiniteScroll>
//     </div>
// };
   
// export default App;
 