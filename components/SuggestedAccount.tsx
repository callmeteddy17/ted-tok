import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '@/store/authStore';
import { IUser } from '@/types';

const SuggestedAccount = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p
        className="text-gray-500 font-semibold m-3 mt-4 hidden
       xl:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div
              className="gap-3 flex p-2 cursor-pointer hover:bg-primary
             font-semibold">
              <div className="w-8 h-8">
                <Image
                  alt="profile image"
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              <div className="hidden xl:flex font-semibold gap-2">
                <p>{user.userName}</p>
                <span className="text-blue-400">
                  <GoVerified />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccount;
