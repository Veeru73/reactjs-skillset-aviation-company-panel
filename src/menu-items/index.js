import { DashboardOutlined, UsergroupAddOutlined, SolutionOutlined, FileProtectOutlined, FileSearchOutlined, IdcardOutlined, ScheduleOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  IdcardOutlined,
  ScheduleOutlined

};

const menuItems = (privileges) => {

  const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: icons.DashboardOutlined,
        breadcrumbs: false
      },
    ]
  };

  if (privileges.includes("CAN_ADD_USER")) {
    dashboard.children.push({
      id: 'AddUser',
      title: 'Add User',
      type: 'item',
      url: '/add-user',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: true
    });
  }

  if (privileges.includes("CAN_VIEW_STUDENTS")) {
    dashboard.children.push({
      id: 'Student',
      title: 'Students',
      type: 'item',
      url: '/student',
      icon: icons.SolutionOutlined,
      breadcrumbs: true
    })
  }

  if (privileges.includes("CAN_VIEW_MANAGERS")) {
    dashboard.children.push(
      {
        id: 'Manager',
        title: 'Manager',
        type: 'item',
        url: '/manager',
        icon: icons.FileProtectOutlined,
        breadcrumbs: true
      },
    )
  }

  if (privileges.includes("CAN_VIEW_EDUCATORS")) {
    dashboard.children.push(
      {
        id: 'educators',
        title: 'Educators',
        type: 'item',
        url: '/educator',
        icon: icons.IdcardOutlined,
        breadcrumbs: true
      },
    )
  }

  const menuItems = {
    items: [dashboard]
  };

  return menuItems;
};

export default menuItems;



//     {
//       id: 'course',
//       title: 'Courses',
//       type: 'item',
//       url: '/course',
//       icon: icons.FileSearchOutlined,
//       breadcrumbs: true
//     },
//     // {
//     //   id: 'assign',
//     //   title: 'Assign Courses',
//     //   type: 'item',
//     //   url: '/assigncourse',
//     //   icon: icons.ScheduleOutlined,
//     //   breadcrumbs: true
//     // },

