import React from 'react';
import Link from 'next/link';
import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';

const PermissionsPage = () => {
  return (
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  );
};

export default PermissionsPage;
