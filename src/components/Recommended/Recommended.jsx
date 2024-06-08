import React, { useEffect, useState } from "react";
import './Recommended.css';
import { API_KEY, value_convertor } from "../../data";
import {Link} from 'react-router-dom'


const Recommended=({categoryId})=>{

    const[apiData,setApiData] = useState([]);

    const fetchData = async()=>{

        const relatedVideo_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url)
        .then(re=>res.json())
        .then(data=>setApiData(data.items))
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(<div className="recommended">
        {apiData.map((items,index)=>{

            return(
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key ={index} className="side-video-list">
        <img src={items.snippet.thumbnails.medium.url}/>
        <div className="vid-info">
            <h4>{items.snippet.title}</h4>
            <p>{items.snippet.channelTitle}</p>
    
            <p>{value_convertor(items.statistics.viewCount) } views</p>
        </div>
    </Link>
             )
        })}
    
    
    
    
    
    
    </div>)
    }
export default Recommended;