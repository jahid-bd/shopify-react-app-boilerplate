import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-10 pt-[100px]">{children}</div>;
};

export default PageWrapper;
