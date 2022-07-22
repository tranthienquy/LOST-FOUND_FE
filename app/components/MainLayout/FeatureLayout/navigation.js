import { USER_ROLE } from "../../../utils/constants";

export const NAVIGATION_MENU = [
    {
        label: 'Home',
        routerLink: '/',
        icon: '',
        items: [],
    },
    {
        label: 'My Item',
        routerLink: '/my-item',
        icon: '',
        items: [],
        permission: [USER_ROLE.USER]

        
    },
    {
        label: 'View Recent Item',
        routerLink: '/item',
        icon: '',
        items: [],
    },
    {
        label: 'Create Lost and Found Item',
        routerLink: '/item-form/add',
        icon: '',
        items: [],
        permission: [USER_ROLE.USER]

    },
  
//    {
//         label: 'Your Item',
//         routerLink: '/item',
//         icon: '',
//         items: [],
//     },
    // {
    //     label: 'news',
    //     routerLink: '/news',
    //     icon: '',
    //     items: [],
    // },

]