const GLOBALS = {
    'APP_NAME'              : 'app',

    'API_KEY'               : process.env.API_KEY,

    'LOGO'                  : 'images/logo.png',
    'ARROW_IMAGE'           : 'api/images/arrow-right.gif',

    'BASE_URL'              : process.env.BASE_URL,
    'BASE_URL_WITHOUT_API'  : process.env.BASE_URL_WITHOUT_API,
    'PORT_BASE_URL'         : process.env.PORT_BASE_URL,

    'S3_BUCKET_ROOT'        : process.env.S3_BUCKET_ROOT,
    'S3_BUCKET_SECRET'      : process.env.S3_BUCKET_SECRET,
    'S3_BUCKET_REGION'      : process.env.S3_BUCKET_REGION,
    'S3_BUCKET_NAME'        : process.env.S3_BUCKET_NAME,
    'S3_BUCKET_KEY'         : process.env.S3_BUCKET_KEY,
    'KEY'                   : process.env.KEY,
    'IV'                    : process.env.IV,

    'ADMIN_KEY'             : process.env.ADMIN_KEY,
    'ADMIN_IV'              : process.env.ADMIN_IV,

    'EMAIL_ID'              : process.env.EMAIL_ID,
    'EMAIL_PASSWORD'        : process.env.EMAIL_PASSWORD,

    'API_PASSWORD'          : process.env.API_PASSWORD,

    'SHORT_DATE'            : 'YYYY-MM-DD',
    'LONG_DATE'             : 'YYYY-MM-DD HH:mm',
    'FULL_DATE'             : 'YYYY-MM-DD HH:mm:ss',

    'USER_IMAGE'            : 'user/',
    'MEDIA_IMAGE'           : 'media/',
    'COUNTRIES_IMAGE'       : 'flag/',

    'PER_PAGE'              : 10,
    
    'ADMIN_URL'             : process.env.ADMIN_URL,
}
module.exports = GLOBALS;
