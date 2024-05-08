import getCloudAuthToken from "@editor/services/cloud-auth-api";

import { createClient } from "@portive/client";
import { map } from "nanostores";

export const $portiveClientStore = map(
  createClient({
    authToken: async () => {
      const { data: res } = await getCloudAuthToken();
      return res.data.attributes.token;
    },
  }),
);
