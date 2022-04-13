import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-full bg-black py-4 px-12 shadow-md'>
      <Link href='/' passHref>
        <h1 className='cursor-pointer font-bold text-white'>eAPP</h1>
      </Link>
    </div>
  );
};

export default Header;
