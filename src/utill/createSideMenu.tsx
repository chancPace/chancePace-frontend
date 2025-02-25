import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/utill/redux/store';

export const createSidebarMenus = (menus: MenuProps['items']): MenuProps['items'] => {
  if (!menus) return menus;

  return menus.map((menu) => {
    if (!menu || !('label' in menu)) return menu;
    if ('children' in menu) {
      return {
        ...menu,
        children: createSidebarMenus(menu.children) || [],
      };
    }

    return {
      ...menu,
      label: <Link href={menu.key as string}>{menu.label}</Link>,
    };
  });
};

const SideBar = () => {
  const router = useRouter();
  const role = useSelector((state: RootState) => state.user.userInfo?.role); // role을 가져옴

  const sidebarMenus = createSidebarMenus([
    {
      key: '/',
      label: `대쉬보드`,
    },
    {
      key: '/space',
      label: '공간 관리',
      children: [
        {
          key: '/myspace',
          label: '공간 조회',
        },
      ],
    },
    {
      key: '/reservation',
      label: '예약 관리',
    },
    {
      key: '/review',
      label: '리뷰 관리',
    },
    {
      key: '/sales',
      label: '매출 관리',
      children: [
        {
          key: '/sales/month',
          label: '연도별 월 매출 조회',
        },
        {
          key: '/sales/day',
          label: '월별 일 매출 조회',
        },
      ],
    },
  ]);

  return (
    <Menu
      mode="inline"
      items={sidebarMenus}
      selectedKeys={[router.pathname]}
      defaultOpenKeys={router.pathname.split('/').slice(1, -1)}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default SideBar;
