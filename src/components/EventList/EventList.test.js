import EventList from './EventList';

import { shallow } from 'enzyme';

const events = [1, 2, 3];

it('renders without crashing', () => {
    shallow(<EventList events={events} />);
});
