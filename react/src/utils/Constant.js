import moment from 'moment';

const GLOBALS = {

    APP_NAME                : 'React',
    LOGO                    : '/assets/images/logo.png',
    DEFAULT_IMAGE           : '/assets/images/ai_eye.jpg',
    STATUS_OPTION           : [{ value: null, label: 'Select Status' }, { value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }],
    PAGE_OPTION             : [10, 25, 50, 100, 500],
    LOGIN_OPTION            : [{ value: null, label: 'Select Login Status' }, { value: 'Online', label: 'Online' }, { value: 'Offline', label: 'Offline' }],
    DATE_PICKER_RANGES      : {
                                'Today': [moment(), moment()],
                                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                                'This Year': [moment().startOf('year'), moment().endOf('year')],
                                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
                                },
    LONG_DATE               : 'YYYY-MM-DD HH:mm A',
    SHORT_DATE              : 'YYYY-MM-DD',
    LONG_TIME               : 'HH:mm A',
    PER_PAGE                : 10,
    IMAGE_ROOT_PATH         : '',
    BLOG_IMAGE              : '/assets/images/blogs/',
    BANNER_IMAGE            : '/assets/images/banner/',
    USER_IMAGE              : '/assets/images/user/',
    PROPERTIESOWNER_IMAGE   : '/assets/images/properties_owner/',
}

export default GLOBALS;