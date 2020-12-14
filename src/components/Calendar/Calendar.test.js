import Calendar from './Calendar';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Calendar />);
});