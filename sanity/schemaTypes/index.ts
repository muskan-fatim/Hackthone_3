import { type SchemaTypeDefinition } from 'sanity'
import car from '../car'
import order from '../order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car,order],
}
