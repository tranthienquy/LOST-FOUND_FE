import React from 'react';
import { USER_ROLE } from '../../utils/constants';
import HomeMainPage from './HomeMainPage/Loadable';
import LoginPage from './LoginPage/Loadable';
import CoursePage from './CoursePage/Loadable';
import CourseDetailPage from './CourseDetailPage/Loadable';
import CourseFormPage from './CourseFormPage/Loadable';
import CourseMyPostPage from './CourseMyPostPage/Loadable';



export const endpoint = '/';
export const routes = [
  {
    path: '/',
    exact: true,
    private: false,
    main: () => <HomeMainPage />,
  },
  {
    path: '/login',
    exact: true,
    private: false,
    main: () => <LoginPage />,
    type: 'unauthorized'
  },
  {
    path: '/item-form/add',
    exact: true,
    private: false,
    main: () => <CourseFormPage />,
  },
  {
    path: '/item-form/edit/:id',
    exact: true,
    private: false,
    main: () => <CourseFormPage />,
  },
  {
    path: '/item',
    exact: true,
    private: false,
    main: () => <CoursePage />,
  },
  {
    path: '/my-item',
    exact: true,
    private: false,
    main: () => <CourseMyPostPage />,
  },
  
   {
    path: '/item/:id',
    exact: true,
    private: false,
    main: () => <CourseDetailPage />,
  },


 
];
