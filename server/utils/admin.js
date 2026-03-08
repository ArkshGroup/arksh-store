const bcrypt = require('bcryptjs');
const admins = [
  {
    name: 'Ram Prasad Sharma',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "ramprasad.sharma@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "984-1234567",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name: 'Sita Devi Adhikari',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "sitadevi.adhikari@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "981-2345678",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name: 'Krishna Bahadur Thapa',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "krishna.thapa@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "980-3456789",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name: 'Gita Kumari Poudel',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "gita.poudel@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "985-4567890",
    role: "CEO",
    joiningData: new Date()
  },
  {
    name: 'Bikram Singh Tamang',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "bikram.tamang@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "986-5678901",
    role: "Manager",
    joiningData: new Date()
  }
];

module.exports = admins;
