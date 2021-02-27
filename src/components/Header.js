import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <Breadcrumb borderBottom="3px solid purple" w="75vw" m="5vh 12.5vw" fontWeight="medium" fontSize="xl" separator="">
        <BreadcrumbItem p={{base:"5px 1em", md: "7.5px 2em"}} isCurrentPage>
          <Link to="/">Streamy</Link>
        </BreadcrumbItem>
        <BreadcrumbItem p={{base:"5px 1em", md: "7.5px 2em"}} float="right"isCurrentPage>
          <Link to="/">All Streams</Link>
        </BreadcrumbItem>
      </Breadcrumb>
  );
};

export default Header;