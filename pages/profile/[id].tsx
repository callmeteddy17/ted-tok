import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import { VideoCard } from '@/components';
import NoResult from '@/components/NoResult';
import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils';
import { profile } from 'console';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideo, setShowUserVideo] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;

  useEffect(() => {
    if (showUserVideo) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideo, userLikedVideos, userVideos]);

  const videos = showUserVideo ? ' border-b-2 border-black' : 'text-gray-400';
  const liked = showUserVideo ? 'text-gray-400' : ' border-b-2 border-black';
  return (
    <div className="w-full">
      <div className="gap-6 flex md:gap-10 mb-4 w-full bg-white">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            alt="profile image"
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col font-semibold gap-1">
          <p className="flex gap-2 text-xl font-bold text-primary">
            {user.userName}
            {` `}
            <GoVerified className="text-blue-400 text-md" />
          </p>
          <p className="capitalize font-medium text-xs text-gray-400 ">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="mt-10 flex border-b-2 gap-10 mb-10 bg-white border-gray-200 w-full">
          <p
            onClick={() => setShowUserVideo(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>
            Videos
          </p>
          <p
            onClick={() => setShowUserVideo(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>
            Liked
          </p>
        </div>
        <div
          className="
        flex gap-6 flex-wrap md:justify-start">
          {videoList.length > 0 ? (
            videoList.map((video: Video, i: number) => (
              <VideoCard post={video} key={i} />
            ))
          ) : (
            <NoResult text={`No ${showUserVideo ? '' : 'liked'} videos yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
