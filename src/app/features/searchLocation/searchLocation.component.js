import template from './searchLocation.template.html';
import viewModel from './searchLocation.view';
import searchList from '../searchList/searchList.component';

const component = {
    name: 'search-location',
    prop: {
        template,
        viewModel
    }
};

if (!ko.components.isRegistered(searchList.name)) {
    ko.components.register(searchList.name, searchList.prop);
}

export default component;