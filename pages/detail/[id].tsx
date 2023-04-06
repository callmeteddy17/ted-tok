import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL, createOrGetUser } from '@/utils';
import { Video } from '@/types';
import useAuthStore from '@/store/authStore';
import LikeButton from '@/components/LikeButton';
import Comment from '@/components/Comment';
import { GoogleLogin } from '@react-oauth/google';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [play, setPlay] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile, addUser }: any = useAuthStore();

  const hanleVideoClick = () => {
    if (play) {
      videoRef?.current?.pause();
      setPlay(false);
    } else {
      videoRef?.current?.play();
      setPlay(true);
    }
  };
  useEffect(() => {
    if (post && videoRef?.current) videoRef.current.muted = isVideoMuted;
  }, [isVideoMuted, post]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({ ...post, comments: data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative h-[100vh] flex-2 w-[1000px]  flex justify-center items-center bg-black ">
        <div className="absolute top-6 z-50 flex gap-6 left-2 lg:left-6">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh] ">
            <video
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={hanleVideoClick}
              src={post.video.asset.url}></video>
          </div>
          <div className="absolute top-[45%] left-[45%]">
            {!play && (
              <button onClick={hanleVideoClick}>
                <BsFillPlayFill className="text-white text-7xl lg:text-8xl" />
                {` `}
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10  right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button
              onClick={() => {
                setIsVideoMuted(false);
              }}
              className="text-white text-4xl lg:text-6xl">
              <HiVolumeOff />
              {` `}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsVideoMuted(true);
              }}
              className="text-white text-4xl lg:text-6xl">
              <HiVolumeUp />
              {` `}
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] ">
        <div className="lg:mt-20 mt-10 ml-6">
          <div className="flex gap-1 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-20 md:h-20 w-16 h-16">
              <Link href={'/'}>
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
              <Link href={'/'}>
                <div className=" items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    {` `}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize mt-2 font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg  text-gray-600">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile ? (
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDisLike={() => handleLike(false)}
                likes={post.likes}
              />
            ) : (
              <>
                <p className="mb-2">Sign in to like video </p>
                <GoogleLogin
                  onSuccess={(response) => createOrGetUser(response, addUser)}
                  onError={() => console.log('Error')}
                />
              </>
            )}
          </div>
          <Comment
            comment={comment}
            comments={post.comments}
            addComment={addComment}
            isPostingComment={isPostingComment}
            setComment={setComment}
          />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};

export default Detail;
