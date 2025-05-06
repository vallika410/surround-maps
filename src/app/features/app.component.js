import template from './app.template.html';
import viewModel from './app.view';
import navTabs from './navTabs/navTabs.component';

const component = {
    name: 'main-app',
    prop: {
        template,
        viewModel
    }
};

ko.components.register(navTabs.name, navTabs.prop);

export default component;