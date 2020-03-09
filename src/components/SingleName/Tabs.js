import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import mq from 'mediaQuery'

const TabLink = styled(Link)`
  font-size: 14px;
  background: ${({ active }) => (active ? '#2C46A6' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#D2D2D2')};
  transform: scale(${({ active }) => (active ? '1.08' : '1')});
  transition: background 0.1s ease-out, transform 0.3s ease-out;
  padding: 10px 30px;
  &:hover,
  &:visited {
    color: ${({ active }) => (active ? 'white' : '#D2D2D2')};
  }
  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`

const TabContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  border: 2px solid #dfdfdf;
  border-radius: 4px;
  margin-left: 43px;
  margin-top: 20px;

  ${mq.small`
    margin: 0;
    margin-left: 20px;
  `}
`
function getDetailsActive(domain, pathname, tab) {
  const { name } = domain
  if (domain.parent !== 'eth') {
    return (
      pathname !== `/name/${name}/register` &&
      pathname !== `/name/${name}/subdomains`
    )
  } else {
    return (
      (tab === 'details' || pathname === `/name/${name}/details`) &&
      (pathname !== `/name/${name}/register` &&
        pathname !== `/name/${name}/subdomains`)
    )
  }
}
const Tabs = ({ domain, pathname, parent, tab }) => {
  const { name, state } = domain
  return (
    (state !== 'Auction' || state !== 'Reveal') && (
      <TabContainer>
        {parent === 'eth' && (
          <TabLink
            active={
              (tab === 'register' || pathname === `/name/${name}/register`) &&
              (pathname !== `/name/${name}/details` &&
                pathname !== `/name/${name}/subdomains`)
            }
            to={`/name/${name}/register`}
          >
            Register
          </TabLink>
        )}

        <TabLink
          active={getDetailsActive(domain, pathname, tab)}
          to={`/name/${name}/details`}
        >
          Details
        </TabLink>
        <TabLink
          active={pathname === `/name/${name}/subdomains`}
          to={`/name/${name}/subdomains`}
        >
          Subdomains
        </TabLink>
      </TabContainer>
    )
  )
}
export default Tabs
