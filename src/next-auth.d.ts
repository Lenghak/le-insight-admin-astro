import "@auth/core/jwt";

declare module "@auth/core/types" {
  interface Session {
    user: {
      type: string;
      id: string;
      image_url: string;
      profile_id: string;
      phone: string;
      email: string;
      role: string;
      banned_until: string;
      deleted_at: string;
      first_name: string;
      last_name: string;
      invited_at: string;
      confirmed_at: string;
      confirmation_sent_at: string;
      created_at: string;
      updated_at: string;
    };
    tokens: {
      sub: string | undefined;
      iat: number | undefined;
      exp: number | undefined;
      jti: string | undefined;
      at: string;
      rt: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    type: string;
    id: string;
    attributes: {
      first_name: string;
      last_name: string;
      profile_id: string;
      phone: string;
      email: string;
      role: string;
      banned_until: string;
      deleted_at: string;
      invited_at: string;
      image_url: string;
      confirmed_at: string;
      confirmation_sent_at: string;
      created_at: string;
      updated_at: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}
