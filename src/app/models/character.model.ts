
export interface Character {
  id: string
  name: string
  description: string
  modified: string
  resourceURI: string
  urls: Url[]
  thumbnail: Thumbnail
  comics: Relation
  stories: Relation
  events: Relation
  series: Relation
}

export interface Url {
  type: string
  url: string
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface Relation {
  available: string
  returned: string
  collectionURI: string
  items: Item[]
}

export interface Item {
  resourceURI: string
  name: string
}
