const menu_data = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About Us',
    link: '/about'
  },
  {
    id: 3,
    title: 'Shop',
    link: '/shop'
  },
  {
    id: 4,
    hasDropdown: true,
    title: 'Men\'s',
    link: '/about',
    submenus: [
      { title: 'Jeans', link: '/shop' },
      { title: 'T-Shirts', link: '/shop' },
      { title: 'Shirts', link: '/shop' },
      { title: 'Jeans', link: '/shop' },
      { title: 'Trousers', link: '/shop' },
      { title: 'Jackets', link: '/shop' },
      { title: 'Shoes', link: '/shop' },
      { title: 'Accessories', link: '/shop' },
    ]
  },
  {
    id: 5,
    title: 'Contact us',
    link: '/contact'
  },
]

export default menu_data;
