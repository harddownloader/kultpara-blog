import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
// import { Todos } from "./models/Todos";
// import { VisibilityFilter, VisibilityFilters } from "./models/VisibilityFilter";

/**
 * Set initial values when we create cache variables.
 */

export const langsVar = makeVar('ENG');

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        languages: {
          read() {
            return langsVar();
          }
        },
        // todos: {
        //   read () {
        //     return todosVar();
        //   }
        // },
        // visibilityFilter: {
        //   read () {
        //     return visibilityFilterVar();
        //   },
        // }
      }
    }
  }
});



// const todosInitialValue: Todos = [
//   {
//     id: 0,
//     completed: false,
//     text: "Use Apollo Client 3"
//   }
// ]
//
// export const todosVar: ReactiveVar<Todos> = makeVar<Todos>(
//   todosInitialValue
// );
//
// export const visibilityFilterVar = makeVar<VisibilityFilter>(
//   VisibilityFilters.SHOW_ALL
// )