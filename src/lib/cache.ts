import { InMemoryCache, makeVar } from "@apollo/client";
import { i18n } from "../../next-i18next.config";
import { socials } from './socials';

/**
 * Set initial values when we create cache variables.
 */

export const languagesVar = makeVar(i18n.locales || []);
export const socialsVar = makeVar(socials);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        languages: {
          read() {
            return languagesVar();
          }
        },
        socials: {
          read() {
            return socialsVar();
          }
        },
      }
    }
  }
});
