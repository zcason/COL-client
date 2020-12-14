import CreateEventForm from './CreateEventForm';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<CreateEventForm />);
});