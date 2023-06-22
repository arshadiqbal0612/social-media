

import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManger';

function OnlyIfNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN);
  return (
    user ? <Navigate to="/"/> : <Outlet />
  )
}

export default OnlyIfNotLoggedIn