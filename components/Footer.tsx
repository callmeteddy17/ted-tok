import React from 'react';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5 '}`}>
    {items.map((item) => (
      <p
        key={item}
        className="text-gray-400 cursor-pointer hover:underline text-sm">
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mmtt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} />
      <List items={footerList3} />
      <p className="text-gray-400 text-sm mt-5">2023 Teddy's Tiktok</p>
    </div>
  );
};

export default Footer;
