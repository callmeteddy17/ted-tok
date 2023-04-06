import { VideoCard } from '@/components';
import axios from 'axios';
import { Video } from '../types';
import { BASE_URL } from '@/utils';
import NoResult from '@/components/NoResult';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResult text={'No Video'} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let respone = null;
  if (topic) {
    respone = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    respone = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: respone.data,
    },
  };
};

export default Home;
