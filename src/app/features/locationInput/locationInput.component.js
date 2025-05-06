import template from './locationInput.template.html';
import viewModel from './locationInput.view';
import searchList from '../searchList/searchList.component';

const component = {
    name: 'location-input',
    prop: {
        viewModel,
        template
    }
};
if (!ko.components.isRegistered(searchList.name)) {
    ko.components.register(searchList.name, searchList.prop);
}
export default component;