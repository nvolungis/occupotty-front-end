
/**
* Simple helper for creating sync actions types.
* It just retrieves an object with the type as key and the type as value.
*/
export default function createSyncActionsTypes (types) {
  if (!Array.isArray(types)) {
    throw new Error("Expecting types to be an array of constants");
  }

  let augmentedTypes = {};

  types.forEach( type => {
    augmentedTypes[type] = type;
  });

  return augmentedTypes;
}
