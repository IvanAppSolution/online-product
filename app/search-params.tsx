import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'
 
// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  search: parseAsString.withDefault(""),
  perPage: parseAsFloat.withDefault(10),
  offset: parseAsFloat.withDefault(1),
}
 
export const loadSearchParams = createLoader(coordinatesSearchParams)