export type Auth = {
  token: string,
  workspaceId: string,
  nodeId: string
};

export type GoogleAnalytics = {
  utm_source: string,
  utm_medium?: string,
  utm_term?: string,
  utm_content?: string,
  utm_campaign?: string
};

export type ContactHubCookie = Auth & {
  context: string,
  contextInfo: Object,
  sid: string,
  customerId?: string,
  hash?: string,
  ga?: GoogleAnalytics
};

export type ConfigOptions = {
  token: string,
  workspaceId: string,
  nodeId: string,
  context?: string,
  contextInfo?: Object
};

export type EventOptions = {
  type: string,
  properties?: Object
};

export type Tags = {
  auto: string[],
  manual: string[]
};

export type OtherContact = {
  name?: string,
  type?: 'MOBILE' | 'PHONE' | 'EMAIL' | 'FAX' | 'OTHER',
  value?: string
};

export type MobileDeviceType = 'IOS' | 'ANDROID' | 'WINDOWS_PHONE' | 'FIREOS';
export type MobileDeviceNotificationCenter = 'APN' | 'GCM' | 'WNS' | 'ADM' | 'SNS';

export type MobileDevice = {
  appId: string,
  identifier?: string,
  name?: string,
  type?: MobileDeviceType,
  notificationService: MobileDeviceNotificationCenter
};

export type Contacts = {
  email?: string,
  fax?: string,
  mobilePhone?: string,
  phone?: string,
  otherContacts?: OtherContact[],
  mobileDevices?: MobileDevice[]
};

export type Geo = {
  lat: number,
  lon: number
};

export type Address = {
  street?: string,
  city?: string,
  country?: string,
  province?: string,
  zip?: string,
  geo?: Geo
};

export type Credential = {
  username?: string,
  password?: string
};

export type Education = {
  id: string,
  schoolType?: 'PRIMARY_SCHOOL' | 'SECONDARY_SCHOOL' | 'HIGH_SCHOOL' | 'COLLEGE' | 'OTHER',
  schoolName?: string,
  schoolConcentration?: string,
  startYear?: number,
  endYear?: number,
  isCurrent?: boolean
};

export type Job = {
  id: string,
  companyIndustry?: string,
  companyName?: string,
  jobTitle?: string,
  startDate?: string,
  endDate?: string,
  isCurrent?: boolean
};

export type Like = {
  id: string,
  category?: string,
  name?: string,
  createdTime?: string
};

export type Social = {
  facebook?: string,
  google?: string,
  instagram?: string,
  linkedin?: string,
  qzone?: string,
  twitter?: string
};

export type Preference = {
  key: string,
  value: string
};

export type Subscription = {
  id: string,
  name?: string,
  type?: string,
  kind?: 'DIGITAL_MESSAGE' | 'SERVICE' | 'OTHER',
  subscribed?: boolean,
  startDate?: string,
  endDate?: string,
  subscriberId?: string,
  registeredAt?: string,
  updatedAt?: string,
  preferences?: Preference[]
};

export type BaseProperties = {
  pictureUrl?: string,
  title?: string,
  prefix?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  gender?: string,
  dob?: string,
  locale?: string,
  timezone?: string,
  contacts?: Contacts,
  address?: Address,
  credential?: Credential,
  educations?: Education[],
  likes?: Like[],
  socialProfile?: Social,
  jobs?: Job[],
  subscriptions?: Subscription[]
};

export type CustomerData = {
  externalId?: string,
  base?: BaseProperties,
  extended?: Object,
  extra?: string,
  tags?: Tags
};

export type Customer = CustomerData & {
  id: string,
  registeredAt: string,
  updatedAt: string
};

export type CHConfig = (method: 'config', options: ConfigOptions) => void;
export type CHCustomer = (method: 'customer', options: CustomerData) => void;
export type CHEvent = (method: 'event', options: EventOptions) => void;

export type ContactHubSDKBrowser = CHConfig & CHCustomer & CHEvent;
