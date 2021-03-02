import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
      <Breadcrumb borderBottom="3px solid purple" w={{base:"75vw", md:"60vw"}} h={{base:"15vw", md:"7.5vw", lg:"6vw", xl:"4.5vw"}} m={{base:"4vw 12.5vw", md:"4vw 20vw"}} fontWeight="medium" fontSize="xl" separator="">
        <BreadcrumbItem lineHeight={{base:"15vw", md:"7.5vw", lg:"6vw", xl:"4.5vw"}} p={{base:"2.5px 0.5em", md:"3.25px 1em"}} isCurrentPage>
          <Link to="/">Streamy</Link>
        </BreadcrumbItem>
        <BreadcrumbItem p={{base:"2.5px 0.5em", md:"3.25px 1em"}} isCurrentPage>
          <Link to="/">All Streams</Link>
        </BreadcrumbItem>
        <BreadcrumbItem p={{base:"2.5px 0.5em", md:"3.25px 1em"}} float="right" isLastChild>
            <GoogleAuth />
        </BreadcrumbItem>
      </Breadcrumb>
  );
};

export default Header;