import _ from 'lodash';
import './index.css';
import '../components/header/header.art'
console.log("this is index file")

const header = require('../components/header/header.art');
const data = {
    title1: 'My Page',
    title2: 'My Page',
    title3: 'My Page',
    title4: 'My Page',
    title5: 'My Page'
};
const html = header(data);
console.log(html)
document.getElementById("header").innerHTML = html

module.exports = header;