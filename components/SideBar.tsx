import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { Discover, Footer, SuggestedAccount } from '../components';

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cusrsor-pointer fonnt-semibold text-red-600 rounded';

  const userProfile = false;

  return (
    <div>
      <div
        onClick={() => setShowSidebar((prev) => !prev)}
        className="block xl:hidden m-2 ml-4 mt-3 text-xl">
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-200 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href={'/'}>
              <div className={normalLink}>
                <p>
                  <AiFillHome />
                </p>
                <span className="text-xl hidden font-semibold xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccount />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SideBar;
