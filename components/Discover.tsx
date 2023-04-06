import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    'xl:border-2 hover:bg-primary xl:border-red-600 px-3 py-2 xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-red-600';
  const topicStyle =
    'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap gap-4">
        {topics.map((items) => (
          <Link href={`/?topic=${items.name}`} key={items.name}>
            <div
              className={topic === items.name ? activeTopicStyle : topicStyle}>
              <span className="font-bold text-2xl w-7 ml-1 text-center xl:text-md">
                {items.icon}
              </span>
              <span className="font-medium capitalize text-md hidden xl:block">
                {items.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
