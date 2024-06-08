import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_convertor } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {

  const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);// for dynamic video title,description and viewcount 
  const [channelData, setChannelData] = useState(null);//for channel data
  const [commentData, setCommentData] = useState([]);//for comment

  const fetchVideoData = async () => {
    // Fetching Video Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then(res => res.json())
      .then(data => setApiData(data.items[0]));
  };//video list API used for dynamic video title,likecount,viewcount,Description

  const fetchOtherData = async () => {
    // Fetching channel Data using channel List API like subscriber count etc.
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then(res => res.json())
      .then(data => setChannelData(data.items[0]));

    // Fetching comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then(res => res.json())
      .then(data => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);// display video details

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]); //display channel details

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className='play-video-info'>
        <p>{apiData ? value_convertor(apiData.statistics.viewCount) : "16k"} &bull; 2 days ago</p>
        <div>
          <span><img src={like} alt='' />{apiData ? value_convertor(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt='' /></span>
          <span><img src={share} alt='' />Share</span>
          <span><img src={save} alt='' />Save</span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt='Publisher' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : "1M"} subscribers </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "description"}</p>
        <hr />
        <h4>{value_convertor(apiData ? apiData.statistics.commentCount : 102)} Comment</h4>
        {commentData.map((item, index) => {
          return (
            <div className="comment" key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='User' />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              </div>
              <div className="comment-action">
                <img src={like} alt='Like' />
                <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt='Dislike' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
