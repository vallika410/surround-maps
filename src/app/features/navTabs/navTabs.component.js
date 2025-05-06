import template from './navTabs.template.html';
import viewModel from './navTabs.view';
import locationInput from '../locationInput/locationInput.component';
import searchLocation from '../searchLocation/searchLocation.component';

const component = {
    name: 'nav-tabs',
    prop: {
        viewModel,
        template
    }
};

ko.components.register(locationInput.name, locationInput.prop);
ko.components.register(searchLocation.name, searchLocation.prop);
export default component;