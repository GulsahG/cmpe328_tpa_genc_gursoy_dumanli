import axios from 'axios';

export default axios.create({
  baseURL: 'https://cmpe328api2.herokuapp.com/'
});