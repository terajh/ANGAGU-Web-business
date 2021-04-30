import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './style.css';
import { SubMenu } from '../index';
import { SideBarItem } from '../../molecules';

type SideBarProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle }) => {
  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: '#fff' }}>
          &times;
        </span>
        <a href="/Main">안가구</a>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>Dummy Heading</p>
          <SubMenu title="Home" icon={faHome} items={submenus[0]} />
          <SideBarItem title={'About'} url={'/about'} icon={faBriefcase} />
          <SubMenu title="Pages" icon={faCopy} items={submenus[1]} />
          <SideBarItem title={'상품관리'} url={'/Main/Product'} icon={faCopy} />
          <SideBarItem title={'기업정보'} url={'/Main/Info'} icon={faCopy} />

          <SideBarItem
            title={'주문관리'}
            url={'/Main/ManageOrder'}
            icon={faImage}
          />
          <SideBarItem title={'FAQ'} url={'/faq'} icon={faQuestion} />
          <SideBarItem title={'Contact'} url={'/contact'} icon={faImage} />
        </Nav>
      </div>
    </div>
  );
};

const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Home 2',
      target: 'Home-2',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: '주문관리',
      target: `/Main/ManageOrder`,
    },
    {
      title: '상품관리',
      target: `/Main/Product`,
    },
    {
      title: '기업정보',
      target: `/Main/Info`,
    },
  ],
];

export default SideBar;
