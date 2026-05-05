import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { blogType } from "./blogType";
import { blogCategoryType } from "./blogCategoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    blockContentType,
    productType,
    orderType,
    authorType,
    blogType,
    blogCategoryType,
  ],
};
