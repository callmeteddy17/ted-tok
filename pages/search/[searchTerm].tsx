import { VideoCard } from '@/components';
import NoResult from '@/components/NoResult';
import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { IUser, Video } from '@/types';

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccount, setIsAccount] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const account = isAccount ? ' border-b-2 border-black' : 'text-gray-400';
  const isVideos = isAccount ? 'text-gray-400' : ' border-b-2 border-black';
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mt-10 flex border-b-2 gap-10 mb-10 bg-white border-gray-200 w-full">
        <p
          onClick={() => setIsAccount(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}>
          Accounts
        </p>
        <p
          onClick={() => setIsAccount(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}>
          Videos
        </p>
      </div>
      {isAccount ? (
        <div className="md:mt-5">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, i) => (
              <div key={i} className="my-2 p-2 rounded-full hover:bg-gray-100">
                <Link href={`/profile/${user._id}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16">
                      <Image
                        alt="profile image"
                        src={user.image}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex font-semibold gap-2">
                      <p>{user.userName}</p>
                      <span className="text-blue-400">
                        <GoVerified />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <NoResult text={`No results for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, i) => <VideoCard post={video} key={i} />)
          ) : (
            <NoResult text={`No results for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const respone = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: respone.data },
  };
};

export default Search;
