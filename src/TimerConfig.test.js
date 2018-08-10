import { configureTimer } from './TimerConfig';
import { shallow } from 'enzyme';

describe('the timer view', () =>{
    let view = configureTimer().view;
    it('displays the current elapsed seconds and clicks', () =>{
        let renderedView = shallow(view(null, {secondsElapsed: 5, counter: 10}));
        expect(renderedView.find('#secs').text()).toMatch(/5/);
        expect(renderedView.find('#clicks').text()).toMatch(/10/);
    });
});
