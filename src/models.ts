export type SocialNetworksAppIds = {
  facebook?: string,
  google?: string,
  linkedIn?: string
}

export type FormOptions = {
  fields: {
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string
  }
}

export type Options = {
  socialNetworksAppIds: SocialNetworksAppIds,
  form: FormOptions
}
