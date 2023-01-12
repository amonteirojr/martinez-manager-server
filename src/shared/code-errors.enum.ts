export enum CodeErrors {
  FAIL_TO_GET_CITIES = 'FAIL_TO_GET_CITIES',
  FAIL_TO_FIND_USER = 'FAIL_TO_FIND_USER',
  CONTRACT_NOT_FOUND = 'CONTRACT_NOT_FOUND',
  FAIL_TO_CREATE_USER = 'FAIL_TO_CREATE_USER',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  ROLE_ALREADY_EXISTS = 'ROLE_ALREADY_EXISTS',
  FAIL_TO_CREATE_ROLE = 'FAIL_TO_CREATE_ROLE',
  FAIL_TO_FIND_ROLE = 'FAIL_TO_FIND_ROLE',
  FAIL_TO_GET_CONTRACT_SUMMARY = 'FAIL_TO_GET_CONTRACT_SUMMARY',
  FAIL_TO_CREATE_SYSTEM = 'FAIL_TO_CREATE_SYSTEM',
  SYSTEM_ALREADY_EXISTS = 'SYSTEM_ALREADY_EXISTS',
  FAIL_TO_FIND_SYSTEM = 'FAIL_TO_FIND_SYSTEM',
  FAIL_TO_GET_ALL_SYSTEMS = 'FAIL_TO_GET_ALL_SYSTEMS',
  FAIL_TO_UPDATE_SYSTEM = 'FAIL_TO_UPDATE_SYSTEM',
  FAIL_TO_DELETE_SYSTEM = 'FAIL_TO_DELETE_SYSTEM',
  FAIL_TO_GET_CONTRACTS = 'FAIL_TO_GET_CONTRACTS',
  FAIL_TO_CREATE_CONTRACT = 'FAIL_TO_CREATE_CONTRACT',
  CITY_ALREADY_EXISTS = 'CITY_ALREADY_EXISTS',
  FAIL_TO_CREATE_CITY = 'FAIL_TO_CREATE_CITY',
  FAIL_TO_CREATE_CUSTOMER = 'FAIL_TO_CREATE_CUSTOMER',
  FAIL_TO_GET_CUSTOMER = 'FAIL_TO_GET_CUSTOMER',
  FAIL_TO_GET_CUSTOMER_TYPES = 'FAIL_TO_GET_CUSTOMER_TYPES',
  FAIL_TO_GET_IBGE_STATES = 'FAIL_TO_GET_IBGE_STATES',
  FAIL_TO_FIND_CITY_BY_IBGE_ID = 'FAIL_TO_FIND_CITY_BY_IBGE_ID',
  FAIL_TO_GET_CITY_POPULATION = 'FAIL_TO_GET_CITY_POPULATION',
  FAIL_TO_SAVE_UPLOADED_FILE = 'FAIL_TO_SAVE_UPLOADED_FILE',
  FAIL_TO_UPLOAD_FILES = 'FAIL_TO_UPLOAD_FILES',
  FAIL_TO_GET_CONTRACT_FILES = 'FAIL_TO_GET_CONTRACT_FILES',
  FILES_IS_NULL = 'FILES_IS_NULL',
  FAIL_TO_SEND_PASSWORD_RECOVERY_EMAIL = 'FAIL_TO_SEND_PASSWORD_RECOVERY_EMAIL',
  USER_EMAIL_NOT_FOUND = 'USER_EMAIL_NOT_FOUND',
  FAIL_TO_RESET_PASSWORD = 'FAIL_TO_RESET_PASSWORD',
  RESET_TOKEN_IS_INVALID = 'RESET_TOKEN_IS_INVALID',
  SYSTEMS_WERE_NOT_FOUND = 'SYSTEMS_WERE_NOT_FOUND',
  FAIL_TO_UPDATE_CONTRACT = 'FAIL_TO_UPDATE_CONTRACT',
  FAIL_TO_CREATE_CUSTOMER_TYPE = 'FAIL_TO_CREATE_CUSTOMER_TYPE',
  SYSTEM_MODULE_ALREADY_EXISTS = 'SYSTEM_MODULE_ALREADY_EXISTS',
  FAIL_TO_CREATE_SYSTEM_MODULE = 'FAIL_TO_CREATE_SYSTEM_MODULE',
  FAIL_TO_FIND_SYSTEM_MODULES = 'FAIL_TO_FIND_SYSTEM_MODULES',
  FAIL_TO_FIND_SYSTEM_MODULE = 'FAIL_TO_FIND_SYSTEM_MODULE',
  FAIL_TO_UPDATE_SYSTEM_MODULE = 'FAIL_TO_UPDATE_SYSTEM_MODULE',
  FAIL_TO_CREATE_ADMENTMENT = 'FAIL_TO_CREATE_ADMENTMENT',
  FAIL_TO_CREATE_ADMENTMENT_TYPE = 'FAIL_TO_CREATE_ADMENTMENT_TYPE',
  FAIL_TO_GET_ADMENTMENT_TYPE = 'FAIL_TO_GET_ADMENTMENT_TYPE',
  FAIL_TO_GET_ADMENTMENT = 'FAIL_TO_GET_ADMENTMENT',
  FAIL_TO_GET_ALL_ADMENTMENT = 'FAIL_TO_GET_ALL_ADMENTMENT',
  FAIL_TO_UPDATE_ADMENTMENT = 'FAIL_TO_UPDATE_ADMENTMENT',
  FAIL_TO_UPDATE_ADMENTMENT_TYPE = 'FAIL_TO_UPDATE_ADMENTMENT_TYPE',
  FAIL_TO_DELETE_FILE = 'FAIL_TO_DELETE_FILE',
  FAIL_TO_GET_CONTRACT_ADMENTMENTS = 'FAIL_TO_GET_CONTRACT_ADMENTMENTS',
  FAIL_TO_FIND_USERS = 'FAIL_TO_FIND_USERS',
  FAIL_TO_GET_ALL_PAYMENT_MODES = 'FAIL_TO_GET_ALL_PAYMENT_MODES',
  FAIL_TO_GET_PAYMENT_MODE = 'FAIL_TO_GET_PAYMENT_MODE',
  FAIL_TO_CREATE_PAYMENT_MODE = 'FAIL_TO_CREATE_PAYMENT_MODE',
  FAIL_TO_DELETE_PAYMENT_MODE = 'FAIL_TO_DELETE_PAYMENT_MODE',
  FAIL_TO_UPDATE_PAYMENT_MODE = 'FAIL_TO_UPDATE_PAYMENT_MODE',
  FAIL_TO_CREATE_BIDDING_MODALITY = 'FAIL_TO_CREATE_BIDDING_MODALITY',
  FAIL_TO_GET_BIDDING_MODALITY = 'FAIL_TO_GET_BIDDING_MODALITY',
  FAIL_TO_GET_ALL_BIDDING_MODALITIES = 'FAIL_TO_GET_ALL_BIDDING_MODALITIES',
  FAIL_TO_DELETE_BIDDING_MODALITY = 'FAIL_TO_DELETE_BIDDING_MODALITY',
  FAIL_TO_UPDATE_BIDDING_MODALITY = 'FAIL_TO_UPDATE_BIDDING_MODALITY',
  FAIL_TO_GET_ALL_LAWS = 'FAIL_TO_GET_ALL_LAWS',
  FAIL_TO_GET_LAW = 'FAIL_TO_GET_LAW',
  FAIL_TO_CREATE_LAW = 'FAIL_TO_CREATE_LAW',
  FAIL_TO_UPDATE_LAW = 'FAIL_TO_UPDATE_LAW',
  FAIL_TO_DELETE_LAW = 'FAIL_TO_DELETE_LAW',
  FAIL_TO_GET_ALL_LAW_ARTICLES = 'FAIL_TO_GET_ALL_LAW_ARTICLES',
  FAIL_TO_GET_LAW_ARTICLE = 'FAIL_TO_GET_LAW_ARTICLE',
  FAIL_TO_CREATE_LAW_ARTICLE = 'FAIL_TO_CREATE_LAW_ARTICLE',
  FAIL_TO_UPDATE_LAW_ARTICLE = 'FAIL_TO_UPDATE_LAW_ARTICLE',
  FAIL_TO_DELETE_LAW_ARTICLE = 'FAIL_TO_DELETE_LAW_ARTICLE',
  FILE_DOES_NOT_EXIST = 'FILE_DOES_NOT_EXIST',
  FAIL_TO_DELETE_CONTRACT = 'FAIL_TO_DELETE_CONTRACT',
  FAIL_TO_GET_RESPONSIBLES = 'FAIL_TO_GET_RESPONSIBLES',
  FAIL_TO_DELETE_RESPONSIBLE = 'FAIL_TO_DELETE_RESPONSIBLE',
  FAIL_TO_CREATE_RESPONSIBLE = 'FAIL_TO_CREATE_RESPONSIBLE',
  FAIL_TO_GET_RESPONSIBLE = 'FAIL_TO_GET_RESPONSIBLE',
  FAIL_TO_UPDATE_RESPONSIBLE = 'FAIL_TO_UPDATE_RESPONSIBLE',
  FAIL_TO_GENERATE_HTML_FROM_EJS = 'FAIL_TO_GENERATE_HTML_FROM_EJS',
  FAIL_TO_GENERATE_REPORT = 'FAIL_TO_GENERATE_REPORT',
}
