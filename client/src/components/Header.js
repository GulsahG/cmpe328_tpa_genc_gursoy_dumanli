import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
      <Breadcrumb 
        borderBottom="0.15em solid #6441a4" 
        w={{base:"75vw", md:"60vw"}} 
        h={{base:"15vw", md:"7.5vw", lg:"6vw", xl:"4.5vw"}} 
        m={{base:"2vw 12.5vw", md:"1vw 20vw"}} 
        fontWeight="medium" 
        fontSize="xl" 
        separator=""
      >
        <BreadcrumbItem 
          lineHeight={{base:"15vw", md:"7.5vw", lg:"6vw", xl:"4.5vw"}} 
          p={{base:"0.2em 0.5em", md:"0.27em 1em"}} 
          isCurrentPage
        >
          <Link to="/videos">All Videos</Link>
        </BreadcrumbItem>
        <BreadcrumbItem 
          p={{base:"0.2em 0.5em", md:"0.27em 1em"}} 
          isCurrentPage
        >
          <Link to="/">All Streams</Link>
        </BreadcrumbItem>
        <BreadcrumbItem 
          p={{base:"0.4em 0.5em", md:"0.25em 1em"}} 
          float="right" 
          isLastChild
        >
          <GoogleAuth />
        </BreadcrumbItem>
      </Breadcrumb>
  );
};

export default Header;