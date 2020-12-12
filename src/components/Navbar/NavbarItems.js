import moment from 'moment';

const begin_date = moment().startOf('month').format('YYYY-MM-DD');
const end_date = moment().endOf('month').format('YYYY-MM-DD');
// Route links that that will go inside navbar menu
const NavbarItems = [
    {
        title: 'Home',
        path: `/home/${begin_date}/${end_date}`,
        itemClass: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        itemClass: 'nav-text'
    },
    {
        title: 'Create Event',
        path: '/create-event',
        itemClass: 'nav-text'
    }
]

export default NavbarItems;