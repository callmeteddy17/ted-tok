import { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { GoVerified } from 'react-icons/go';
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsPlay,
  BsPlayFill,
} from 'react-icons/bs';

import { Video } from '../types';
import user from '@/sanity-backend/backend/schemas/user';
import useAuthStore from '@/store/authStore';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [play, setPlay] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {} = useAuthStore();

  const onVideoPress = () => {
    if (play) {
      videoRef?.current?.pause();
      setPlay(false);
    } else {
      videoRef?.current?.play();
      setPlay(true);
    }
  };
  useEffect(() => {
    if (videoRef?.current) videoRef.current.muted = isVideoMuted;
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 md:mt-10 gap-4 flex relative">
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video
              onClick={onVideoPress}
              ref={videoRef}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}></video>
            <p className="mt-3 font-semibold">{post.caption}</p>
          </Link>
          {isHover && (
            <div className="absolute bottom-10 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between sm:justify-between w-[100px] md:w-[50px] p-3">
              {play ? (
                <button
                  onClick={onVideoPress}
                  className="text-black text-2xl lg:text-4">
                  <BsFillPauseFill />
                  {` `}
                </button>
              ) : (
                <button
                  onClick={onVideoPress}
                  className="text-black text-2xl lg:text-4xl">
                  <BsPlayFill />
                  {` `}
                </button>
              )}
              {isVideoMuted ? (
                <button
                  onClick={() => {
                    setIsVideoMuted(false);
                  }}
                  className="text-black text-2xl lg:text-4xl">
                  <HiVolumeOff />
                  {` `}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsVideoMuted(true);
                  }}
                  className="text-black text-2xl lg:text-4xl">
                  <HiVolumeUp />
                  {` `}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
