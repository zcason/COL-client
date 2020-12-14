import ProfileCard from './ProfileCard';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<ProfileCard />);
});