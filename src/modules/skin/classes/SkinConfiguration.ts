export interface SkinConfigurationData {
  name: string
  version: string
}

/** Represents the skin.ini */
export class SkinConfiguration {
  constructor(public data: SkinConfigurationData) {}
}
