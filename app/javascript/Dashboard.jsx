import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Avatar, Row, Col, Dropdown } from 'antd';

import UserSettingsContainer from './UserSettingsContainer';
import logo from './images/s_logo_symbol.png';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/my-settings">
            <Icon type="user" /> My Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            <Icon type="logout" /> Log out
          </a>
        </Menu.Item>
      </Menu>
    );


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          breakpoint="lg"
          collapsedWidth="80"
        >
          <div className="menu-logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[this.props.location.pathname]}>
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Widgets</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="/my-settings">
              <Link to="/my-settings">
                <Icon type="user" />
                <span>My Settings</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div>
              <Row>
                <Col offset={21} span={3}>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <span style={{ cursor: 'pointer' }}>
                      <Avatar icon="user" /> {this.props.currentUser.username} <Icon type="down" />
                    </span>
                  </Dropdown>
                </Col>
              </Row>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>App</Breadcrumb.Item>
              <Switch>
                <Route path="/my-settings">
                  <Breadcrumb.Item>My Settings</Breadcrumb.Item>
                </Route>
                <Route path="/" exact>
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Route>
              </Switch>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/my-settings">
                  <UserSettingsContainer currentUser={this.props.currentUser} />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Company Corp ©2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Dashboard);
