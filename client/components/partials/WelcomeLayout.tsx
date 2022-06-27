import React from "react";

interface WLayoutProps {
  children: any;
}

const WelcomeLayout = ({ children }: WLayoutProps) => {
  return (
    <div className="md:w-3/5 lg:w-2/5 w-11/12 mx-auto mt-36 shadow-md rounded-md p-3 md:p-6">
      {children}
    </div>
  );
};

export default WelcomeLayout;
