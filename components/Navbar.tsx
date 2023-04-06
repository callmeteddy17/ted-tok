import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import logo from '../utils/logo.png';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image className="cursor-pointer block" alt="logo" src={logo} />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={handleSearch}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="bg-primary p-3 md:text-md border-2 w-[300px] md:w-[350px] rounded-full 
            font-medium border-gray-100 focus:outline-none focus:border-gray-300 focus:border-2"
          />
          <button
            className="absolute right-6 md:right-5 border-l-2 border-gray-300 pl-4 text-gray-400 hover:text-red-600 text-2xl top-3"
            onClick={handleSearch}>
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 rounded-3xl px-3 md:px-4 py-1 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className=" text-xl " />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={'/'}>
                <Image
                  width={32}
                  height={32}
                  className="rounded-full"
                  src={userProfile.image}
                  alt="profile photo"
                />
              </Link>
            )}
            <button
              className="px-2"
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}>
              {` `}
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error...')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
