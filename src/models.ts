export type SocialNetworksClientIds = {
  facebook?: string,
  google?: string,
  linkedin?: string
}

export type FormOptions = {
  fields: {
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string
  }
}

export type Options = {
  socialNetworksClientIds: SocialNetworksClientIds,
  form: FormOptions
}
