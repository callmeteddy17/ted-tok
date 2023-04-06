import { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '@/store/authStore';

interface IProps {
  handleLike: () => void;
  handleDisLike: () => void;
  likes: any[];
}

const LikeButton = ({ handleDisLike, handleLike, likes }: IProps) => {
  const [liked, setLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((like) => like._ref === userProfile._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className="flex gap-6">
      <div className="cursor-pointer flex flex-col justify-center items-center">
        {liked ? (
          <div
            onClick={handleDisLike}
            className="bg-primary rounded-full p-2 md:p-4 text-red-600">
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className="bg-primary rounded-full p-2 md:p-4 text-gray-400">
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length | 0} likes</p>
      </div>
    </div>
  );
};

export default LikeButton;
