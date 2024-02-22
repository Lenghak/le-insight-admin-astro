var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all3) => {
  for (var name in all3)
    __defProp(target, name, { get: all3[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize3;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode4;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize3(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode6;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate2(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode4(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode6(val) {
      return encodeURIComponent(val);
    }
    function isDate2(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode5) {
      try {
        return decode5(str);
      } catch (e2) {
        return str;
      }
    }
  }
});

// .vercel/output/_functions/chunks/index_BzCEkO8R.mjs
function sequence(...handlers) {
  const filtered = handlers.filter((h2) => !!h2);
  const length = filtered.length;
  if (!length) {
    const handler = defineMiddleware((context, next) => {
      return next();
    });
    return handler;
  }
  return defineMiddleware((context, next) => {
    return applyHandle(0, context);
    function applyHandle(i3, handleContext) {
      const handle = filtered[i3];
      const result = handle(handleContext, async () => {
        if (i3 < length - 1) {
          return applyHandle(i3 + 1, handleContext);
        } else {
          return next();
        }
      });
      return result;
    }
  });
}
function defineMiddleware(fn) {
  return fn;
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/cookie.js
var __classPrivateFieldSet = function(receiver, state2, value, kind, f3) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f3)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state2 === "function" ? receiver !== state2 || !f3 : !state2.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state2.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state2, kind, f3) {
  if (kind === "a" && !f3)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state2 === "function" ? receiver !== state2 || !f3 : !state2.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state2.get(receiver);
};
var _SessionStore_instances;
var _SessionStore_chunks;
var _SessionStore_option;
var _SessionStore_logger;
var _SessionStore_chunk;
var _SessionStore_clean;
var ALLOWED_COOKIE_SIZE = 4096;
var ESTIMATED_EMPTY_COOKIE_SIZE = 160;
var CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
  const cookiePrefix = useSecureCookies ? "__Secure-" : "";
  return {
    // default cookie options
    sessionToken: {
      name: `${cookiePrefix}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}authjs.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}authjs.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
        // 15 minutes in seconds
      }
    },
    state: {
      name: `${cookiePrefix}authjs.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 60 * 15
        // 15 minutes in seconds
      }
    },
    nonce: {
      name: `${cookiePrefix}authjs.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies
      }
    }
  };
}
var SessionStore = class {
  constructor(option, cookies, logger2) {
    _SessionStore_instances.add(this);
    _SessionStore_chunks.set(this, {});
    _SessionStore_option.set(this, void 0);
    _SessionStore_logger.set(this, void 0);
    __classPrivateFieldSet(this, _SessionStore_logger, logger2, "f");
    __classPrivateFieldSet(this, _SessionStore_option, option, "f");
    if (!cookies)
      return;
    const { name: sessionCookiePrefix } = option;
    for (const [name, value] of Object.entries(cookies)) {
      if (!name.startsWith(sessionCookiePrefix) || !value)
        continue;
      __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
  }
  /**
   * The JWT Session or database Session ID
   * constructed from the cookie chunks.
   */
  get value() {
    const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a3, b3) => {
      const aSuffix = parseInt(a3.split(".").pop() || "0");
      const bSuffix = parseInt(b3.split(".").pop() || "0");
      return aSuffix - bSuffix;
    });
    return sortedKeys.map((key) => __classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
  }
  /**
   * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
   * If the cookie has changed from chunked to unchunked or vice versa,
   * it deletes the old cookies as well.
   */
  chunk(value, options) {
    const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
    const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
      name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
      value,
      options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, ...options }
    });
    for (const chunk of chunked) {
      cookies[chunk.name] = chunk;
    }
    return Object.values(cookies);
  }
  /** Returns a list of cookies that should be cleaned. */
  clean() {
    return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
  }
};
_SessionStore_chunks = /* @__PURE__ */ new WeakMap(), _SessionStore_option = /* @__PURE__ */ new WeakMap(), _SessionStore_logger = /* @__PURE__ */ new WeakMap(), _SessionStore_instances = /* @__PURE__ */ new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk2(cookie) {
  const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
  if (chunkCount === 1) {
    __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie.name] = cookie.value;
    return [cookie];
  }
  const cookies = [];
  for (let i3 = 0; i3 < chunkCount; i3++) {
    const name = `${cookie.name}.${i3}`;
    const value = cookie.value.substr(i3 * CHUNK_SIZE, CHUNK_SIZE);
    cookies.push({ ...cookie, name, value });
    __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
  }
  __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
    message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
    emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
    valueSize: cookie.value.length,
    chunks: cookies.map((c3) => c3.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
  });
  return cookies;
}, _SessionStore_clean = function _SessionStore_clean2() {
  const cleanedChunks = {};
  for (const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")) {
    delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
    cleanedChunks[name] = {
      name,
      value: "",
      options: { ...__classPrivateFieldGet(this, _SessionStore_option, "f").options, maxAge: 0 }
    };
  }
  return cleanedChunks;
};

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/errors.js
var AuthError = class extends Error {
  constructor(message2, errorOptions) {
    if (message2 instanceof Error) {
      super(void 0, {
        cause: { err: message2, ...message2.cause, ...errorOptions }
      });
    } else if (typeof message2 === "string") {
      if (errorOptions instanceof Error) {
        errorOptions = { err: errorOptions, ...errorOptions.cause };
      }
      super(message2, errorOptions);
    } else {
      super(void 0, message2);
    }
    this.name = this.constructor.name;
    this.type = this.constructor.type ?? "AuthError";
    this.kind = this.constructor.kind ?? "error";
    Error.captureStackTrace?.(this, this.constructor);
    const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
    this.message += `${this.message ? " ." : ""}Read more at ${url}`;
  }
};
var SignInError = class extends AuthError {
};
SignInError.kind = "signIn";
var AdapterError = class extends AuthError {
};
AdapterError.type = "AdapterError";
var AuthorizedCallbackError = class extends AuthError {
};
AuthorizedCallbackError.type = "AuthorizedCallbackError";
var CallbackRouteError = class extends AuthError {
};
CallbackRouteError.type = "CallbackRouteError";
var ErrorPageLoop = class extends AuthError {
};
ErrorPageLoop.type = "ErrorPageLoop";
var EventError = class extends AuthError {
};
EventError.type = "EventError";
var InvalidCallbackUrl = class extends AuthError {
};
InvalidCallbackUrl.type = "InvalidCallbackUrl";
var CredentialsSignin = class extends SignInError {
};
CredentialsSignin.type = "CredentialsSignin";
var InvalidEndpoints = class extends AuthError {
};
InvalidEndpoints.type = "InvalidEndpoints";
var InvalidCheck = class extends AuthError {
};
InvalidCheck.type = "InvalidCheck";
var JWTSessionError = class extends AuthError {
};
JWTSessionError.type = "JWTSessionError";
var MissingAdapter = class extends AuthError {
};
MissingAdapter.type = "MissingAdapter";
var MissingAdapterMethods = class extends AuthError {
};
MissingAdapterMethods.type = "MissingAdapterMethods";
var MissingAuthorize = class extends AuthError {
};
MissingAuthorize.type = "MissingAuthorize";
var MissingSecret = class extends AuthError {
};
MissingSecret.type = "MissingSecret";
var OAuthAccountNotLinked = class extends SignInError {
};
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
var OAuthCallbackError = class extends SignInError {
};
OAuthCallbackError.type = "OAuthCallbackError";
var OAuthProfileParseError = class extends AuthError {
};
OAuthProfileParseError.type = "OAuthProfileParseError";
var SessionTokenError = class extends AuthError {
};
SessionTokenError.type = "SessionTokenError";
var OAuthSignInError = class extends SignInError {
};
OAuthSignInError.type = "OAuthSignInError";
var EmailSignInError = class extends SignInError {
};
EmailSignInError.type = "EmailSignInError";
var SignOutError = class extends AuthError {
};
SignOutError.type = "SignOutError";
var UnknownAction = class extends AuthError {
};
UnknownAction.type = "UnknownAction";
var UnsupportedStrategy = class extends AuthError {
};
UnsupportedStrategy.type = "UnsupportedStrategy";
var InvalidProvider = class extends AuthError {
};
InvalidProvider.type = "InvalidProvider";
var UntrustedHost = class extends AuthError {
};
UntrustedHost.type = "UntrustedHost";
var Verification = class extends AuthError {
};
Verification.type = "Verification";
var MissingCSRF = class extends SignInError {
};
MissingCSRF.type = "MissingCSRF";

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/assert.js
var warned = false;
function isValidHttpUrl(url, baseUrl) {
  try {
    return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : void 0).protocol);
  } catch {
    return false;
  }
}
var hasCredentials = false;
var hasEmail = false;
var emailMethods = [
  "createVerificationToken",
  "useVerificationToken",
  "getUserByEmail"
];
var sessionMethods = [
  "createUser",
  "getUser",
  "getUserByEmail",
  "getUserByAccount",
  "updateUser",
  "linkAccount",
  "createSession",
  "getSessionAndUser",
  "updateSession",
  "deleteSession"
];
function assertConfig(request, options) {
  const { url } = request;
  const warnings = [];
  if (!warned && options.debug)
    warnings.push("debug-enabled");
  if (!options.trustHost) {
    return new UntrustedHost(`Host must be trusted. URL was: ${request.url}`);
  }
  if (!options.secret) {
    return new MissingSecret("Please define a `secret`.");
  }
  const callbackUrlParam = request.query?.callbackUrl;
  if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
    return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
  }
  const { callbackUrl: defaultCallbackUrl } = defaultCookies(options.useSecureCookies ?? url.protocol === "https:");
  const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
  if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
    return new InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
  }
  for (const p3 of options.providers) {
    const provider = typeof p3 === "function" ? p3() : p3;
    if ((provider.type === "oauth" || provider.type === "oidc") && !(provider.issuer ?? provider.options?.issuer)) {
      const { authorization: a3, token: t2, userinfo: u3 } = provider;
      let key;
      if (typeof a3 !== "string" && !a3?.url)
        key = "authorization";
      else if (typeof t2 !== "string" && !t2?.url)
        key = "token";
      else if (typeof u3 !== "string" && !u3?.url)
        key = "userinfo";
      if (key) {
        return new InvalidEndpoints(`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required.`);
      }
    }
    if (provider.type === "credentials")
      hasCredentials = true;
    else if (provider.type === "email")
      hasEmail = true;
  }
  if (hasCredentials) {
    const dbStrategy = options.session?.strategy === "database";
    const onlyCredentials = !options.providers.some((p3) => (typeof p3 === "function" ? p3() : p3).type !== "credentials");
    if (dbStrategy && onlyCredentials) {
      return new UnsupportedStrategy("Signing in with credentials only supported if JWT strategy is enabled");
    }
    const credentialsNoAuthorize = options.providers.some((p3) => {
      const provider = typeof p3 === "function" ? p3() : p3;
      return provider.type === "credentials" && !provider.authorize;
    });
    if (credentialsNoAuthorize) {
      return new MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
    }
  }
  const { adapter, session: session2 } = options;
  if (hasEmail || session2?.strategy === "database" || !session2?.strategy && adapter) {
    let methods;
    if (hasEmail) {
      if (!adapter)
        return new MissingAdapter("Email login requires an adapter.");
      methods = emailMethods;
    } else {
      if (!adapter)
        return new MissingAdapter("Database session requires an adapter.");
      methods = sessionMethods;
    }
    const missing = methods.filter((m3) => !adapter[m3]);
    if (missing.length) {
      return new MissingAdapterMethods(`Required adapter methods were missing: ${missing.join(", ")}`);
    }
  }
  if (!warned)
    warned = true;
  return warnings;
}

// node_modules/.pnpm/@panva+hkdf@1.1.1/node_modules/@panva/hkdf/dist/web/runtime/hkdf.js
var getGlobal = () => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  throw new Error("unable to locate global object");
};
var hkdf_default = async (digest2, ikm, salt, info, keylen) => {
  const { crypto: { subtle } } = getGlobal();
  return new Uint8Array(await subtle.deriveBits({
    name: "HKDF",
    hash: `SHA-${digest2.substr(3)}`,
    salt,
    info
  }, await subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]), keylen << 3));
};

// node_modules/.pnpm/@panva+hkdf@1.1.1/node_modules/@panva/hkdf/dist/web/index.js
function normalizeDigest(digest2) {
  switch (digest2) {
    case "sha256":
    case "sha384":
    case "sha512":
    case "sha1":
      return digest2;
    default:
      throw new TypeError('unsupported "digest" value');
  }
}
function normalizeUint8Array(input, label) {
  if (typeof input === "string")
    return new TextEncoder().encode(input);
  if (!(input instanceof Uint8Array))
    throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
  return input;
}
function normalizeIkm(input) {
  const ikm = normalizeUint8Array(input, "ikm");
  if (!ikm.byteLength)
    throw new TypeError(`"ikm" must be at least one byte in length`);
  return ikm;
}
function normalizeInfo(input) {
  const info = normalizeUint8Array(input, "info");
  if (info.byteLength > 1024) {
    throw TypeError('"info" must not contain more than 1024 bytes');
  }
  return info;
}
function normalizeKeylen(input, digest2) {
  if (typeof input !== "number" || !Number.isInteger(input) || input < 1) {
    throw new TypeError('"keylen" must be a positive integer');
  }
  const hashlen = parseInt(digest2.substr(3), 10) >> 3 || 20;
  if (input > 255 * hashlen) {
    throw new TypeError('"keylen" too large');
  }
  return input;
}
async function hkdf(digest2, ikm, salt, info, keylen) {
  return hkdf_default(normalizeDigest(digest2), normalizeIkm(ikm), normalizeUint8Array(salt, "salt"), normalizeInfo(info), normalizeKeylen(keylen, digest2));
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default = crypto;
var isCryptoKey = (key) => key instanceof CryptoKey;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/digest.js
var digest = async (algorithm, data) => {
  const subtleDigest = `SHA-${algorithm.slice(-3)}`;
  return new Uint8Array(await webcrypto_default.subtle.digest(subtleDigest, data));
};
var digest_default = digest;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf2 = new Uint8Array(size);
  let i3 = 0;
  for (const buffer of buffers) {
    buf2.set(buffer, i3);
    i3 += buffer.length;
  }
  return buf2;
}
function p2s(alg, p2sInput) {
  return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf2, value, offset) {
  if (value < 0 || value >= MAX_INT32) {
    throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
  }
  buf2.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
}
function uint64be(value) {
  const high = Math.floor(value / MAX_INT32);
  const low = value % MAX_INT32;
  const buf2 = new Uint8Array(8);
  writeUInt32BE(buf2, high, 0);
  writeUInt32BE(buf2, low, 4);
  return buf2;
}
function uint32be(value) {
  const buf2 = new Uint8Array(4);
  writeUInt32BE(buf2, value);
  return buf2;
}
function lengthAndInput(input) {
  return concat(uint32be(input.length), input);
}
async function concatKdf(secret, bits, value) {
  const iterations = Math.ceil((bits >> 3) / 32);
  const res = new Uint8Array(iterations * 32);
  for (let iter = 0; iter < iterations; iter++) {
    const buf2 = new Uint8Array(4 + secret.length + value.length);
    buf2.set(uint32be(iter + 1));
    buf2.set(secret, 4);
    buf2.set(value, 4 + secret.length);
    res.set(await digest_default("sha256", buf2), iter * 32);
  }
  return res.slice(0, bits >> 3);
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE3 = 32768;
  const arr = [];
  for (let i3 = 0; i3 < unencoded.length; i3 += CHUNK_SIZE3) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i3, i3 + CHUNK_SIZE3)));
  }
  return btoa(arr.join(""));
};
var encode = (input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i3 = 0; i3 < binary.length; i3++) {
    bytes[i3] = binary.charCodeAt(i3);
  }
  return bytes;
};
var decode = (input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/util/errors.js
var JOSEError = class extends Error {
  static get code() {
    return "ERR_JOSE_GENERIC";
  }
  constructor(message2) {
    super(message2);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static get code() {
    return "ERR_JWT_CLAIM_VALIDATION_FAILED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JWTExpired = class extends JOSEError {
  static get code() {
    return "ERR_JWT_EXPIRED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
  static get code() {
    return "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_JOSE_NOT_SUPPORTED";
  }
};
var JWEDecryptionFailed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
    this.message = "decryption operation failed";
  }
  static get code() {
    return "ERR_JWE_DECRYPTION_FAILED";
  }
};
var JWEInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
  static get code() {
    return "ERR_JWE_INVALID";
  }
};
var JWTInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
  static get code() {
    return "ERR_JWT_INVALID";
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/random.js
var random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/iv.js
function bitLength(alg) {
  switch (alg) {
    case "A128GCM":
    case "A128GCMKW":
    case "A192GCM":
    case "A192GCMKW":
    case "A256GCM":
    case "A256GCMKW":
      return 96;
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return 128;
    default:
      throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
var iv_default = (alg) => random_default(new Uint8Array(bitLength(alg) >> 3));

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/check_iv_length.js
var checkIvLength = (enc, iv) => {
  if (iv.length << 3 !== bitLength(enc)) {
    throw new JWEInvalid("Invalid Initialization Vector length");
  }
};
var check_iv_length_default = checkIvLength;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/check_cek_length.js
var checkCekLength = (cek, expected) => {
  const actual = cek.byteLength << 3;
  if (actual !== expected) {
    throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
  }
};
var check_cek_length_default = checkCekLength;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/timing_safe_equal.js
var timingSafeEqual = (a3, b3) => {
  if (!(a3 instanceof Uint8Array)) {
    throw new TypeError("First argument must be a buffer");
  }
  if (!(b3 instanceof Uint8Array)) {
    throw new TypeError("Second argument must be a buffer");
  }
  if (a3.length !== b3.length) {
    throw new TypeError("Input buffers must have the same length");
  }
  const len = a3.length;
  let out = 0;
  let i3 = -1;
  while (++i3 < len) {
    out |= a3[i3] ^ b3[i3];
  }
  return out === 0;
};
var timing_safe_equal_default = timingSafeEqual;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkEncCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "A128GCM":
    case "A192GCM":
    case "A256GCM": {
      if (!isAlgorithm(key.algorithm, "AES-GCM"))
        throw unusable("AES-GCM");
      const expected = parseInt(alg.slice(1, 4), 10);
      const actual = key.algorithm.length;
      if (actual !== expected)
        throw unusable(expected, "algorithm.length");
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (!isAlgorithm(key.algorithm, "AES-KW"))
        throw unusable("AES-KW");
      const expected = parseInt(alg.slice(1, 4), 10);
      const actual = key.algorithm.length;
      if (actual !== expected)
        throw unusable(expected, "algorithm.length");
      break;
    }
    case "ECDH": {
      switch (key.algorithm.name) {
        case "ECDH":
        case "X25519":
        case "X448":
          break;
        default:
          throw unusable("ECDH, X25519, or X448");
      }
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW":
      if (!isAlgorithm(key.algorithm, "PBKDF2"))
        throw unusable("PBKDF2");
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (!isAlgorithm(key.algorithm, "RSA-OAEP"))
        throw unusable("RSA-OAEP");
      const expected = parseInt(alg.slice(9), 10) || 1;
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types2) {
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
};
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/is_key_like.js
var is_key_like_default = (key) => {
  return isCryptoKey(key);
};
var types = ["CryptoKey"];

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/decrypt.js
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
  if (!(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
  }
  const keySize = parseInt(enc.slice(1, 4), 10);
  const encKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
  const macKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
    hash: `SHA-${keySize << 1}`,
    name: "HMAC"
  }, false, ["sign"]);
  const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
  const expectedTag = new Uint8Array((await webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
  let macCheckPassed;
  try {
    macCheckPassed = timing_safe_equal_default(tag, expectedTag);
  } catch {
  }
  if (!macCheckPassed) {
    throw new JWEDecryptionFailed();
  }
  let plaintext;
  try {
    plaintext = new Uint8Array(await webcrypto_default.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
  } catch {
  }
  if (!plaintext) {
    throw new JWEDecryptionFailed();
  }
  return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
  let encKey;
  if (cek instanceof Uint8Array) {
    encKey = await webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
  } else {
    checkEncCryptoKey(cek, enc, "decrypt");
    encKey = cek;
  }
  try {
    return new Uint8Array(await webcrypto_default.subtle.decrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, concat(ciphertext, tag)));
  } catch {
    throw new JWEDecryptionFailed();
  }
}
var decrypt = async (enc, cek, ciphertext, iv, tag, aad) => {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
  }
  if (!iv) {
    throw new JWEInvalid("JWE Initialization Vector missing");
  }
  if (!tag) {
    throw new JWEInvalid("JWE Authentication Tag missing");
  }
  check_iv_length_default(enc, iv);
  switch (enc) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
      return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
      return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
    default:
      throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
  }
};
var decrypt_default = decrypt;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/is_disjoint.js
var isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
var is_disjoint_default = isDisjoint;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/bogus.js
var bogusWebCrypto = [
  { hash: "SHA-256", name: "HMAC" },
  true,
  ["sign"]
];
var bogus_default = bogusWebCrypto;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/aeskw.js
function checkKeySize(key, alg) {
  if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
    throw new TypeError(`Invalid key size for alg: ${alg}`);
  }
}
function getCryptoKey(key, alg, usage) {
  if (isCryptoKey(key)) {
    checkEncCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    return webcrypto_default.subtle.importKey("raw", key, "AES-KW", true, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}
var wrap = async (alg, key, cek) => {
  const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
  checkKeySize(cryptoKey, alg);
  const cryptoKeyCek = await webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
  return new Uint8Array(await webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
};
var unwrap = async (alg, key, encryptedKey) => {
  const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
  checkKeySize(cryptoKey, alg);
  const cryptoKeyCek = await webcrypto_default.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", ...bogus_default);
  return new Uint8Array(await webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/ecdhes.js
async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
  if (!isCryptoKey(publicKey)) {
    throw new TypeError(invalid_key_input_default(publicKey, ...types));
  }
  checkEncCryptoKey(publicKey, "ECDH");
  if (!isCryptoKey(privateKey)) {
    throw new TypeError(invalid_key_input_default(privateKey, ...types));
  }
  checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
  const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
  let length;
  if (publicKey.algorithm.name === "X25519") {
    length = 256;
  } else if (publicKey.algorithm.name === "X448") {
    length = 448;
  } else {
    length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
  }
  const sharedSecret = new Uint8Array(await webcrypto_default.subtle.deriveBits({
    name: publicKey.algorithm.name,
    public: publicKey
  }, privateKey, length));
  return concatKdf(sharedSecret, keyLength, value);
}
async function generateEpk(key) {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  return webcrypto_default.subtle.generateKey(key.algorithm, true, ["deriveBits"]);
}
function ecdhAllowed(key) {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  return ["P-256", "P-384", "P-521"].includes(key.algorithm.namedCurve) || key.algorithm.name === "X25519" || key.algorithm.name === "X448";
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/check_p2s.js
function checkP2s(p2s2) {
  if (!(p2s2 instanceof Uint8Array) || p2s2.length < 8) {
    throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
  }
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/pbes2kw.js
function getCryptoKey2(key, alg) {
  if (key instanceof Uint8Array) {
    return webcrypto_default.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
  }
  if (isCryptoKey(key)) {
    checkEncCryptoKey(key, alg, "deriveBits", "deriveKey");
    return key;
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}
async function deriveKey2(p2s2, alg, p2c, key) {
  checkP2s(p2s2);
  const salt = p2s(alg, p2s2);
  const keylen = parseInt(alg.slice(13, 16), 10);
  const subtleAlg = {
    hash: `SHA-${alg.slice(8, 11)}`,
    iterations: p2c,
    name: "PBKDF2",
    salt
  };
  const wrapAlg = {
    length: keylen,
    name: "AES-KW"
  };
  const cryptoKey = await getCryptoKey2(key, alg);
  if (cryptoKey.usages.includes("deriveBits")) {
    return new Uint8Array(await webcrypto_default.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
  }
  if (cryptoKey.usages.includes("deriveKey")) {
    return webcrypto_default.subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, ["wrapKey", "unwrapKey"]);
  }
  throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
var encrypt = async (alg, key, cek, p2c = 2048, p2s2 = random_default(new Uint8Array(16))) => {
  const derived = await deriveKey2(p2s2, alg, p2c, key);
  const encryptedKey = await wrap(alg.slice(-6), derived, cek);
  return { encryptedKey, p2c, p2s: encode(p2s2) };
};
var decrypt2 = async (alg, key, encryptedKey, p2c, p2s2) => {
  const derived = await deriveKey2(p2s2, alg, p2c, key);
  return unwrap(alg.slice(-6), derived, encryptedKey);
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/subtle_rsaes.js
function subtleRsaEs(alg) {
  switch (alg) {
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      return "RSA-OAEP";
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/check_key_length.js
var check_key_length_default = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/rsaes.js
var encrypt2 = async (alg, key, cek) => {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  checkEncCryptoKey(key, alg, "encrypt", "wrapKey");
  check_key_length_default(alg, key);
  if (key.usages.includes("encrypt")) {
    return new Uint8Array(await webcrypto_default.subtle.encrypt(subtleRsaEs(alg), key, cek));
  }
  if (key.usages.includes("wrapKey")) {
    const cryptoKeyCek = await webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
    return new Uint8Array(await webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, key, subtleRsaEs(alg)));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
};
var decrypt3 = async (alg, key, encryptedKey) => {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  checkEncCryptoKey(key, alg, "decrypt", "unwrapKey");
  check_key_length_default(alg, key);
  if (key.usages.includes("decrypt")) {
    return new Uint8Array(await webcrypto_default.subtle.decrypt(subtleRsaEs(alg), key, encryptedKey));
  }
  if (key.usages.includes("unwrapKey")) {
    const cryptoKeyCek = await webcrypto_default.subtle.unwrapKey("raw", encryptedKey, key, subtleRsaEs(alg), ...bogus_default);
    return new Uint8Array(await webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/cek.js
function bitLength2(alg) {
  switch (alg) {
    case "A128GCM":
      return 128;
    case "A192GCM":
      return 192;
    case "A256GCM":
    case "A128CBC-HS256":
      return 256;
    case "A192CBC-HS384":
      return 384;
    case "A256CBC-HS512":
      return 512;
    default:
      throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
var cek_default = (alg) => random_default(new Uint8Array(bitLength2(alg) >> 3));

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/jwk_to_key.js
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
var parse = async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = { ...jwk };
  delete keyData.alg;
  delete keyData.use;
  return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
};
var jwk_to_key_default = parse;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/key/import.js
async function importJWK(jwk, alg) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg || (alg = jwk.alg);
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      if (jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
    case "EC":
    case "OKP":
      return jwk_to_key_default({ ...jwk, alg });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/check_key_type.js
var symmetricTypeCheck = (alg, key) => {
  if (key instanceof Uint8Array)
    return;
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${types.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage) => {
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types));
  }
  if (key.type === "secret") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
var checkKeyType = (alg, key, usage) => {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};
var check_key_type_default = checkKeyType;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/encrypt.js
async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
  if (!(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
  }
  const keySize = parseInt(enc.slice(1, 4), 10);
  const encKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
  const macKey = await webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
    hash: `SHA-${keySize << 1}`,
    name: "HMAC"
  }, false, ["sign"]);
  const ciphertext = new Uint8Array(await webcrypto_default.subtle.encrypt({
    iv,
    name: "AES-CBC"
  }, encKey, plaintext));
  const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
  const tag = new Uint8Array((await webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
  return { ciphertext, tag };
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
  let encKey;
  if (cek instanceof Uint8Array) {
    encKey = await webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  } else {
    checkEncCryptoKey(cek, enc, "encrypt");
    encKey = cek;
  }
  const encrypted = new Uint8Array(await webcrypto_default.subtle.encrypt({
    additionalData: aad,
    iv,
    name: "AES-GCM",
    tagLength: 128
  }, encKey, plaintext));
  const tag = encrypted.slice(-16);
  const ciphertext = encrypted.slice(0, -16);
  return { ciphertext, tag };
}
var encrypt3 = async (enc, plaintext, cek, iv, aad) => {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
  }
  check_iv_length_default(enc, iv);
  switch (enc) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
      return cbcEncrypt(enc, plaintext, cek, iv, aad);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
      return gcmEncrypt(enc, plaintext, cek, iv, aad);
    default:
      throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
  }
};
var encrypt_default = encrypt3;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/aesgcmkw.js
async function wrap2(alg, key, cek, iv) {
  const jweAlgorithm = alg.slice(0, 7);
  iv || (iv = iv_default(jweAlgorithm));
  const { ciphertext: encryptedKey, tag } = await encrypt_default(jweAlgorithm, cek, key, iv, new Uint8Array(0));
  return { encryptedKey, iv: encode(iv), tag: encode(tag) };
}
async function unwrap2(alg, key, encryptedKey, iv, tag) {
  const jweAlgorithm = alg.slice(0, 7);
  return decrypt_default(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/decrypt_key_management.js
async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
  check_key_type_default(alg, key, "decrypt");
  switch (alg) {
    case "dir": {
      if (encryptedKey !== void 0)
        throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
      return key;
    }
    case "ECDH-ES":
      if (encryptedKey !== void 0)
        throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!isObject(joseHeader.epk))
        throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
      if (!ecdhAllowed(key))
        throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      const epk = await importJWK(joseHeader.epk, alg);
      let partyUInfo;
      let partyVInfo;
      if (joseHeader.apu !== void 0) {
        if (typeof joseHeader.apu !== "string")
          throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
        try {
          partyUInfo = decode(joseHeader.apu);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the apu");
        }
      }
      if (joseHeader.apv !== void 0) {
        if (typeof joseHeader.apv !== "string")
          throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
        try {
          partyVInfo = decode(joseHeader.apv);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the apv");
        }
      }
      const sharedSecret = await deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? bitLength2(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
      if (alg === "ECDH-ES")
        return sharedSecret;
      if (encryptedKey === void 0)
        throw new JWEInvalid("JWE Encrypted Key missing");
      return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (encryptedKey === void 0)
        throw new JWEInvalid("JWE Encrypted Key missing");
      return decrypt3(alg, key, encryptedKey);
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      if (encryptedKey === void 0)
        throw new JWEInvalid("JWE Encrypted Key missing");
      if (typeof joseHeader.p2c !== "number")
        throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
      const p2cLimit = options?.maxPBES2Count || 1e4;
      if (joseHeader.p2c > p2cLimit)
        throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
      if (typeof joseHeader.p2s !== "string")
        throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
      let p2s2;
      try {
        p2s2 = decode(joseHeader.p2s);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the p2s");
      }
      return decrypt2(alg, key, encryptedKey, joseHeader.p2c, p2s2);
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (encryptedKey === void 0)
        throw new JWEInvalid("JWE Encrypted Key missing");
      return unwrap(alg, key, encryptedKey);
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      if (encryptedKey === void 0)
        throw new JWEInvalid("JWE Encrypted Key missing");
      if (typeof joseHeader.iv !== "string")
        throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
      if (typeof joseHeader.tag !== "string")
        throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
      let iv;
      try {
        iv = decode(joseHeader.iv);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the iv");
      }
      let tag;
      try {
        tag = decode(joseHeader.tag);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the tag");
      }
      return unwrap2(alg, key, encryptedKey, iv, tag);
    }
    default: {
      throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
    }
  }
}
var decrypt_key_management_default = decryptKeyManagement;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
var validate_crit_default = validateCrit;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/validate_algorithms.js
var validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s3) => typeof s3 !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
var validate_algorithms_default = validateAlgorithms;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwe/flattened/decrypt.js
async function flattenedDecrypt(jwe, key, options) {
  if (!isObject(jwe)) {
    throw new JWEInvalid("Flattened JWE must be an object");
  }
  if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) {
    throw new JWEInvalid("JOSE Header missing");
  }
  if (jwe.iv !== void 0 && typeof jwe.iv !== "string") {
    throw new JWEInvalid("JWE Initialization Vector incorrect type");
  }
  if (typeof jwe.ciphertext !== "string") {
    throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
  }
  if (jwe.tag !== void 0 && typeof jwe.tag !== "string") {
    throw new JWEInvalid("JWE Authentication Tag incorrect type");
  }
  if (jwe.protected !== void 0 && typeof jwe.protected !== "string") {
    throw new JWEInvalid("JWE Protected Header incorrect type");
  }
  if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") {
    throw new JWEInvalid("JWE Encrypted Key incorrect type");
  }
  if (jwe.aad !== void 0 && typeof jwe.aad !== "string") {
    throw new JWEInvalid("JWE AAD incorrect type");
  }
  if (jwe.header !== void 0 && !isObject(jwe.header)) {
    throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
  }
  if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) {
    throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
  }
  let parsedProt;
  if (jwe.protected) {
    try {
      const protectedHeader2 = decode(jwe.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader2));
    } catch {
      throw new JWEInvalid("JWE Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jwe.header, jwe.unprotected)) {
    throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jwe.header,
    ...jwe.unprotected
  };
  validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
  if (joseHeader.zip !== void 0) {
    throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
  }
  const { alg, enc } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
  }
  if (typeof enc !== "string" || !enc) {
    throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
  }
  const keyManagementAlgorithms = options && validate_algorithms_default("keyManagementAlgorithms", options.keyManagementAlgorithms);
  const contentEncryptionAlgorithms = options && validate_algorithms_default("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
  if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
    throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
  }
  let encryptedKey;
  if (jwe.encrypted_key !== void 0) {
    try {
      encryptedKey = decode(jwe.encrypted_key);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the encrypted_key");
    }
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jwe);
    resolvedKey = true;
  }
  let cek;
  try {
    cek = await decrypt_key_management_default(alg, key, encryptedKey, joseHeader, options);
  } catch (err) {
    if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
      throw err;
    }
    cek = cek_default(enc);
  }
  let iv;
  let tag;
  if (jwe.iv !== void 0) {
    try {
      iv = decode(jwe.iv);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the iv");
    }
  }
  if (jwe.tag !== void 0) {
    try {
      tag = decode(jwe.tag);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the tag");
    }
  }
  const protectedHeader = encoder.encode(jwe.protected ?? "");
  let additionalData;
  if (jwe.aad !== void 0) {
    additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
  } else {
    additionalData = protectedHeader;
  }
  let ciphertext;
  try {
    ciphertext = decode(jwe.ciphertext);
  } catch {
    throw new JWEInvalid("Failed to base64url decode the ciphertext");
  }
  const plaintext = await decrypt_default(enc, cek, ciphertext, iv, tag, additionalData);
  const result = { plaintext };
  if (jwe.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jwe.aad !== void 0) {
    try {
      result.additionalAuthenticatedData = decode(jwe.aad);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the aad");
    }
  }
  if (jwe.unprotected !== void 0) {
    result.sharedUnprotectedHeader = jwe.unprotected;
  }
  if (jwe.header !== void 0) {
    result.unprotectedHeader = jwe.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwe/compact/decrypt.js
async function compactDecrypt(jwe, key, options) {
  if (jwe instanceof Uint8Array) {
    jwe = decoder.decode(jwe);
  }
  if (typeof jwe !== "string") {
    throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
  if (length !== 5) {
    throw new JWEInvalid("Invalid Compact JWE");
  }
  const decrypted = await flattenedDecrypt({
    ciphertext,
    iv: iv || void 0,
    protected: protectedHeader,
    tag: tag || void 0,
    encrypted_key: encryptedKey || void 0
  }, key, options);
  const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: decrypted.key };
  }
  return result;
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/runtime/key_to_jwk.js
var keyToJWK = async (key) => {
  if (key instanceof Uint8Array) {
    return {
      kty: "oct",
      k: encode(key)
    };
  }
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
  }
  if (!key.extractable) {
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  }
  const { ext, key_ops, alg, use, ...jwk } = await webcrypto_default.subtle.exportKey("jwk", key);
  return jwk;
};
var key_to_jwk_default = keyToJWK;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/key/export.js
async function exportJWK(key) {
  return key_to_jwk_default(key);
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/encrypt_key_management.js
async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
  let encryptedKey;
  let parameters;
  let cek;
  check_key_type_default(alg, key, "encrypt");
  switch (alg) {
    case "dir": {
      cek = key;
      break;
    }
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!ecdhAllowed(key)) {
        throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      }
      const { apu, apv } = providedParameters;
      let { epk: ephemeralKey } = providedParameters;
      ephemeralKey || (ephemeralKey = (await generateEpk(key)).privateKey);
      const { x: x2, y: y2, crv, kty } = await exportJWK(ephemeralKey);
      const sharedSecret = await deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? bitLength2(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
      parameters = { epk: { x: x2, crv, kty } };
      if (kty === "EC")
        parameters.epk.y = y2;
      if (apu)
        parameters.apu = encode(apu);
      if (apv)
        parameters.apv = encode(apv);
      if (alg === "ECDH-ES") {
        cek = sharedSecret;
        break;
      }
      cek = providedCek || cek_default(enc);
      const kwAlg = alg.slice(-6);
      encryptedKey = await wrap(kwAlg, sharedSecret, cek);
      break;
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      cek = providedCek || cek_default(enc);
      encryptedKey = await encrypt2(alg, key, cek);
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      cek = providedCek || cek_default(enc);
      const { p2c, p2s: p2s2 } = providedParameters;
      ({ encryptedKey, ...parameters } = await encrypt(alg, key, cek, p2c, p2s2));
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      cek = providedCek || cek_default(enc);
      encryptedKey = await wrap(alg, key, cek);
      break;
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      cek = providedCek || cek_default(enc);
      const { iv } = providedParameters;
      ({ encryptedKey, ...parameters } = await wrap2(alg, key, cek, iv));
      break;
    }
    default: {
      throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
    }
  }
  return { cek, encryptedKey, parameters };
}
var encrypt_key_management_default = encryptKeyManagement;

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected = Symbol();
var FlattenedEncrypt = class {
  constructor(plaintext) {
    if (!(plaintext instanceof Uint8Array)) {
      throw new TypeError("plaintext must be an instance of Uint8Array");
    }
    this._plaintext = plaintext;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError("setKeyManagementParameters can only be called once");
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setSharedUnprotectedHeader(sharedUnprotectedHeader) {
    if (this._sharedUnprotectedHeader) {
      throw new TypeError("setSharedUnprotectedHeader can only be called once");
    }
    this._sharedUnprotectedHeader = sharedUnprotectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  setAdditionalAuthenticatedData(aad) {
    this._aad = aad;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError("setContentEncryptionKey can only be called once");
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError("setInitializationVector can only be called once");
    }
    this._iv = iv;
    return this;
  }
  async encrypt(key, options) {
    if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
      throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
    }
    if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
      throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...this._protectedHeader,
      ...this._unprotectedHeader,
      ...this._sharedUnprotectedHeader
    };
    validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this._protectedHeader, joseHeader);
    if (joseHeader.zip !== void 0) {
      throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
    }
    if (typeof enc !== "string" || !enc) {
      throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
    }
    let encryptedKey;
    if (alg === "dir") {
      if (this._cek) {
        throw new TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
      }
    } else if (alg === "ECDH-ES") {
      if (this._cek) {
        throw new TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
      }
    }
    let cek;
    {
      let parameters;
      ({ cek, encryptedKey, parameters } = await encrypt_key_management_default(alg, enc, key, this._cek, this._keyManagementParameters));
      if (parameters) {
        if (options && unprotected in options) {
          if (!this._unprotectedHeader) {
            this.setUnprotectedHeader(parameters);
          } else {
            this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
          }
        } else {
          if (!this._protectedHeader) {
            this.setProtectedHeader(parameters);
          } else {
            this._protectedHeader = { ...this._protectedHeader, ...parameters };
          }
        }
      }
    }
    this._iv || (this._iv = iv_default(enc));
    let additionalData;
    let protectedHeader;
    let aadMember;
    if (this._protectedHeader) {
      protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
    } else {
      protectedHeader = encoder.encode("");
    }
    if (this._aad) {
      aadMember = encode(this._aad);
      additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
    } else {
      additionalData = protectedHeader;
    }
    const { ciphertext, tag } = await encrypt_default(enc, this._plaintext, cek, this._iv, additionalData);
    const jwe = {
      ciphertext: encode(ciphertext),
      iv: encode(this._iv),
      tag: encode(tag)
    };
    if (encryptedKey) {
      jwe.encrypted_key = encode(encryptedKey);
    }
    if (aadMember) {
      jwe.aad = aadMember;
    }
    if (this._protectedHeader) {
      jwe.protected = decoder.decode(protectedHeader);
    }
    if (this._sharedUnprotectedHeader) {
      jwe.unprotected = this._sharedUnprotectedHeader;
    }
    if (this._unprotectedHeader) {
      jwe.header = this._unprotectedHeader;
    }
    return jwe;
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/epoch.js
var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = (str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/lib/jwt_claims_set.js
var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
var jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
  }
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now2 = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
    }
    if (payload.nbf > now2 + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
    }
    if (payload.exp <= now2 - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now2 - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
    }
  }
  return payload;
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwt/decrypt.js
async function jwtDecrypt(jwt2, key, options) {
  const decrypted = await compactDecrypt(jwt2, key, options);
  const payload = jwt_claims_set_default(decrypted.protectedHeader, decrypted.plaintext, options);
  const { protectedHeader } = decrypted;
  if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) {
    throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
  }
  if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) {
    throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
  }
  if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
    throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
  }
  const result = { payload, protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: decrypted.key };
  }
  return result;
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwe/compact/encrypt.js
var CompactEncrypt = class {
  constructor(plaintext) {
    this._flattened = new FlattenedEncrypt(plaintext);
  }
  setContentEncryptionKey(cek) {
    this._flattened.setContentEncryptionKey(cek);
    return this;
  }
  setInitializationVector(iv) {
    this._flattened.setInitializationVector(iv);
    return this;
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  setKeyManagementParameters(parameters) {
    this._flattened.setKeyManagementParameters(parameters);
    return this;
  }
  async encrypt(key, options) {
    const jwe = await this._flattened.encrypt(key, options);
    return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwt/produce.js
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
var ProduceJWT = class {
  constructor(payload = {}) {
    if (!isObject(payload)) {
      throw new TypeError("JWT Claims Set MUST be an object");
    }
    this._payload = payload;
  }
  setIssuer(issuer) {
    this._payload = { ...this._payload, iss: issuer };
    return this;
  }
  setSubject(subject) {
    this._payload = { ...this._payload, sub: subject };
    return this;
  }
  setAudience(audience) {
    this._payload = { ...this._payload, aud: audience };
    return this;
  }
  setJti(jwtId) {
    this._payload = { ...this._payload, jti: jwtId };
    return this;
  }
  setNotBefore(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, nbf: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setExpirationTime(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, exp: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setIssuedAt(input) {
    if (typeof input === "undefined") {
      this._payload = { ...this._payload, iat: epoch_default(/* @__PURE__ */ new Date()) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", epoch_default(input)) };
    } else if (typeof input === "string") {
      this._payload = {
        ...this._payload,
        iat: validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(input))
      };
    } else {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", input) };
    }
    return this;
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwt/encrypt.js
var EncryptJWT = class extends ProduceJWT {
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError("setKeyManagementParameters can only be called once");
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError("setContentEncryptionKey can only be called once");
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError("setInitializationVector can only be called once");
    }
    this._iv = iv;
    return this;
  }
  replicateIssuerAsHeader() {
    this._replicateIssuerAsHeader = true;
    return this;
  }
  replicateSubjectAsHeader() {
    this._replicateSubjectAsHeader = true;
    return this;
  }
  replicateAudienceAsHeader() {
    this._replicateAudienceAsHeader = true;
    return this;
  }
  async encrypt(key, options) {
    const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
    if (this._replicateIssuerAsHeader) {
      this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
    }
    if (this._replicateSubjectAsHeader) {
      this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
    }
    if (this._replicateAudienceAsHeader) {
      this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
    }
    enc.setProtectedHeader(this._protectedHeader);
    if (this._iv) {
      enc.setInitializationVector(this._iv);
    }
    if (this._cek) {
      enc.setContentEncryptionKey(this._cek);
    }
    if (this._keyManagementParameters) {
      enc.setKeyManagementParameters(this._keyManagementParameters);
    }
    return enc.encrypt(key, options);
  }
};

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/jwks/remote.js
var USER_AGENT;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION3 = "v5.2.2";
  USER_AGENT = `${NAME}/${VERSION3}`;
}

// node_modules/.pnpm/jose@5.2.2/node_modules/jose/dist/browser/util/base64url.js
var base64url_exports2 = {};
__export(base64url_exports2, {
  decode: () => decode2,
  encode: () => encode2
});
var encode2 = encode;
var decode2 = decode;

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/jwt.js
var import_cookie3 = __toESM(require_cookie(), 1);
var DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
var now = () => Date.now() / 1e3 | 0;
async function encode3(params) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  return await new EncryptJWT(token).setProtectedHeader({ alg: "dir", enc: "A256GCM" }).setIssuedAt().setExpirationTime(now() + maxAge).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function decode3(params) {
  const { token, secret, salt } = params;
  if (!token)
    return null;
  const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15
  });
  return payload;
}
async function getDerivedEncryptionKey(keyMaterial, salt) {
  return await hkdf("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, 32);
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/callback-url.js
async function createCallbackUrl({ options, paramValue, cookieValue }) {
  const { url, callbacks } = options;
  let callbackUrl = url.origin;
  if (paramValue) {
    callbackUrl = await callbacks.redirect({
      url: paramValue,
      baseUrl: url.origin
    });
  } else if (cookieValue) {
    callbackUrl = await callbacks.redirect({
      url: cookieValue,
      baseUrl: url.origin
    });
  }
  return {
    callbackUrl,
    // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
    callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : void 0
  };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/web.js
var import_cookie4 = __toESM(require_cookie(), 1);
async function getBody(req) {
  if (!("body" in req) || !req.body || req.method !== "POST")
    return;
  const contentType = req.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await req.json();
  } else if (contentType?.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(await req.text());
    return Object.fromEntries(params);
  }
}
var actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
async function toInternalRequest(req) {
  try {
    let originalUrl = new URL(req.url.replace(/\/$/, ""));
    let url = new URL(originalUrl);
    const pathname = url.pathname.replace(/\/$/, "");
    const action = actions.find((a3) => pathname.includes(a3));
    if (!action) {
      throw new UnknownAction(`Cannot detect action in pathname (${pathname}).`);
    }
    const re = new RegExp(`/${action}.*`);
    url = new URL(url.href.replace(re, ""));
    if (req.method !== "GET" && req.method !== "POST") {
      throw new UnknownAction("Only GET and POST requests are supported.");
    }
    const providerIdOrAction = pathname.split("/").pop();
    let providerId;
    if (providerIdOrAction && !action.includes(providerIdOrAction) && ["signin", "callback"].includes(action)) {
      providerId = providerIdOrAction;
    }
    return {
      url,
      action,
      providerId,
      method: req.method,
      headers: Object.fromEntries(req.headers),
      body: req.body ? await getBody(req) : void 0,
      cookies: (0, import_cookie4.parse)(req.headers.get("cookie") ?? "") ?? {},
      error: originalUrl.searchParams.get("error") ?? void 0,
      query: Object.fromEntries(originalUrl.searchParams)
    };
  } catch (e2) {
    return e2;
  }
}
function toRequest(request) {
  return new Request(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.method === "POST" ? JSON.stringify(request.body ?? {}) : void 0
  });
}
function toResponse(res) {
  const headers = new Headers(res.headers);
  res.cookies?.forEach((cookie) => {
    const { name, value, options } = cookie;
    const cookieHeader = (0, import_cookie4.serialize)(name, value, options);
    if (headers.has("Set-Cookie"))
      headers.append("Set-Cookie", cookieHeader);
    else
      headers.set("Set-Cookie", cookieHeader);
  });
  let body = res.body;
  if (headers.get("content-type") === "application/json")
    body = JSON.stringify(res.body);
  else if (headers.get("content-type") === "application/x-www-form-urlencoded")
    body = new URLSearchParams(res.body).toString();
  const status = res.redirect ? 302 : res.status ?? 200;
  const response = new Response(body, { headers, status });
  if (res.redirect)
    response.headers.set("Location", res.redirect);
  return response;
}
async function createHash(message2) {
  const data = new TextEncoder().encode(message2);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b3) => b3.toString(16).padStart(2, "0")).join("").toString();
}
function randomString(size) {
  const i2hex = (i3) => ("0" + i3.toString(16)).slice(-2);
  const r3 = (a3, i3) => a3 + i2hex(i3);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r3, "");
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js
async function createCSRFToken({ options, cookieValue, isPost, bodyValue }) {
  if (cookieValue) {
    const [csrfToken2, csrfTokenHash2] = cookieValue.split("|");
    const expectedCsrfTokenHash = await createHash(`${csrfToken2}${options.secret}`);
    if (csrfTokenHash2 === expectedCsrfTokenHash) {
      const csrfTokenVerified = isPost && csrfToken2 === bodyValue;
      return { csrfTokenVerified, csrfToken: csrfToken2 };
    }
  }
  const csrfToken = randomString(32);
  const csrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
  const cookie = `${csrfToken}|${csrfTokenHash}`;
  return { cookie, csrfToken };
}
function validateCSRF(action, verified) {
  if (verified)
    return;
  throw new MissingCSRF(`CSRF token was missing during an action ${action}.`);
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/merge.js
function isObject2(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function merge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (isObject2(target) && isObject2(source)) {
    for (const key in source) {
      if (isObject2(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return merge(target, ...sources);
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/providers.js
function parseProviders(params) {
  const { url, providerId, options } = params;
  const providers = params.providers.map((p3) => {
    const provider = typeof p3 === "function" ? p3() : p3;
    const { options: userOptions, ...defaults2 } = provider;
    const id = userOptions?.id ?? defaults2.id;
    const merged = merge(defaults2, userOptions, {
      signinUrl: `${url}/signin/${id}`,
      callbackUrl: `${url}/callback/${id}`
    });
    if (provider.type === "oauth" || provider.type === "oidc") {
      merged.redirectProxyUrl ?? (merged.redirectProxyUrl = options.redirectProxyUrl);
      return normalizeOAuth(merged);
    }
    return merged;
  });
  return {
    providers,
    provider: providers.find(({ id }) => id === providerId)
  };
}
function normalizeOAuth(c3) {
  if (c3.issuer)
    c3.wellKnown ?? (c3.wellKnown = `${c3.issuer}/.well-known/openid-configuration`);
  const authorization = normalizeEndpoint(c3.authorization, c3.issuer);
  if (authorization && !authorization.url?.searchParams.has("scope")) {
    authorization.url.searchParams.set("scope", "openid profile email");
  }
  const token = normalizeEndpoint(c3.token, c3.issuer);
  const userinfo = normalizeEndpoint(c3.userinfo, c3.issuer);
  const checks = c3.checks ?? ["pkce"];
  if (c3.redirectProxyUrl) {
    if (!checks.includes("state"))
      checks.push("state");
    c3.redirectProxyUrl = `${c3.redirectProxyUrl}/callback/${c3.id}`;
  }
  return {
    ...c3,
    authorization,
    token,
    checks,
    userinfo,
    profile: c3.profile ?? defaultProfile,
    account: c3.account ?? defaultAccount
  };
}
var defaultProfile = (profile) => {
  const id = profile.sub ?? profile.id;
  if (!id)
    throw new OAuthProfileParseError("Missing user id");
  return stripUndefined({
    id: id.toString(),
    name: profile.name ?? profile.nickname ?? profile.preferred_username,
    email: profile.email,
    image: profile.picture
  });
};
var defaultAccount = (account) => {
  return stripUndefined({
    access_token: account.access_token,
    id_token: account.id_token,
    refresh_token: account.refresh_token,
    expires_at: account.expires_at,
    scope: account.scope,
    token_type: account.token_type,
    session_state: account.session_state
  });
};
function stripUndefined(o4) {
  const result = {};
  for (let [k3, v3] of Object.entries(o4))
    v3 !== void 0 && (result[k3] = v3);
  return result;
}
function normalizeEndpoint(e2, issuer) {
  if (!e2 && issuer)
    return;
  if (typeof e2 === "string") {
    return { url: new URL(e2) };
  }
  const url = new URL(e2?.url ?? "https://authjs.dev");
  if (e2?.params != null) {
    for (let [key, value] of Object.entries(e2.params)) {
      if (key === "claims")
        value = JSON.stringify(value);
      url.searchParams.set(key, String(value));
    }
  }
  return { url, request: e2?.request, conform: e2?.conform };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/logger.js
var red = "\x1B[31m";
var yellow = "\x1B[33m";
var grey = "\x1B[90m";
var reset = "\x1B[0m";
var logger = {
  error(error) {
    const name = error instanceof AuthError ? error.type : error.name;
    console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
    if (error.cause && typeof error.cause === "object" && "err" in error.cause && error.cause.err instanceof Error) {
      const { err, ...data } = error.cause;
      console.error(`${red}[auth][cause]${reset}:`, err.stack);
      if (data)
        console.error(`${red}[auth][details]${reset}:`, JSON.stringify(data, null, 2));
    } else if (error.stack) {
      console.error(error.stack.replace(/.*/, "").substring(1));
    }
  },
  warn(code) {
    const url = `https://warnings.authjs.dev#${code}`;
    console.warn(`${yellow}[auth][warn][${code}]${reset}`, `Read more: ${url}`);
  },
  debug(message2, metadata) {
    console.log(`${grey}[auth][debug]:${reset} ${message2}`, JSON.stringify(metadata, null, 2));
  }
};
function setLogger(newLogger = {}, debug) {
  if (!debug)
    logger.debug = () => {
    };
  if (newLogger.error)
    logger.error = newLogger.error;
  if (newLogger.warn)
    logger.warn = newLogger.warn;
  if (newLogger.debug)
    logger.debug = newLogger.debug;
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/init.js
var defaultCallbacks = {
  signIn() {
    return true;
  },
  redirect({ url, baseUrl }) {
    if (url.startsWith("/"))
      return `${baseUrl}${url}`;
    else if (new URL(url).origin === baseUrl)
      return url;
    return baseUrl;
  },
  session({ session: session2 }) {
    return session2;
  },
  jwt({ token }) {
    return token;
  }
};
async function init({ authOptions, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost }) {
  const { providers, provider } = parseProviders({
    providers: authOptions.providers,
    url,
    providerId,
    options: authOptions
  });
  const maxAge = 30 * 24 * 60 * 60;
  let isOnRedirectProxy = false;
  if ((provider?.type === "oauth" || provider?.type === "oidc") && provider.redirectProxyUrl) {
    try {
      isOnRedirectProxy = new URL(provider.redirectProxyUrl).origin === url.origin;
    } catch {
      throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
    }
  }
  const options = {
    debug: false,
    pages: {},
    theme: {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    },
    // Custom options override defaults
    ...authOptions,
    // These computed settings can have values in userOptions but we override them
    // and are request-specific.
    url,
    action,
    // @ts-expect-errors
    provider,
    cookies: {
      ...defaultCookies(authOptions.useSecureCookies ?? url.protocol === "https:"),
      // Allow user cookie options to override any cookie settings above
      ...authOptions.cookies
    },
    providers,
    // Session options
    session: {
      // If no adapter specified, force use of JSON Web Tokens (stateless)
      strategy: authOptions.adapter ? "database" : "jwt",
      maxAge,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => crypto.randomUUID(),
      ...authOptions.session
    },
    // JWT options
    jwt: {
      // Asserted in assert.ts
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: authOptions.secret,
      maxAge: authOptions.session?.maxAge ?? maxAge,
      encode: encode3,
      decode: decode3,
      ...authOptions.jwt
    },
    // Event messages
    events: eventsErrorHandler(authOptions.events ?? {}, logger),
    adapter: adapterErrorHandler(authOptions.adapter, logger),
    // Callback functions
    callbacks: { ...defaultCallbacks, ...authOptions.callbacks },
    logger,
    callbackUrl: url.origin,
    isOnRedirectProxy
  };
  const cookies = [];
  if (csrfDisabled) {
    options.csrfTokenVerified = true;
  } else {
    const { csrfToken, cookie: csrfCookie, csrfTokenVerified } = await createCSRFToken({
      options,
      cookieValue: reqCookies?.[options.cookies.csrfToken.name],
      isPost,
      bodyValue: reqCsrfToken
    });
    options.csrfToken = csrfToken;
    options.csrfTokenVerified = csrfTokenVerified;
    if (csrfCookie) {
      cookies.push({
        name: options.cookies.csrfToken.name,
        value: csrfCookie,
        options: options.cookies.csrfToken.options
      });
    }
  }
  const { callbackUrl, callbackUrlCookie } = await createCallbackUrl({
    options,
    cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
    paramValue: reqCallbackUrl
  });
  options.callbackUrl = callbackUrl;
  if (callbackUrlCookie) {
    cookies.push({
      name: options.cookies.callbackUrl.name,
      value: callbackUrlCookie,
      options: options.cookies.callbackUrl.options
    });
  }
  return { options, cookies };
}
function eventsErrorHandler(methods, logger2) {
  return Object.keys(methods).reduce((acc, name) => {
    acc[name] = async (...args) => {
      try {
        const method = methods[name];
        return await method(...args);
      } catch (e2) {
        logger2.error(new EventError(e2));
      }
    };
    return acc;
  }, {});
}
function adapterErrorHandler(adapter, logger2) {
  if (!adapter)
    return;
  return Object.keys(adapter).reduce((acc, name) => {
    acc[name] = async (...args) => {
      try {
        logger2.debug(`adapter_${name}`, { args });
        const method = adapter[name];
        return await method(...args);
      } catch (e2) {
        const error = new AdapterError(e2);
        logger2.error(error);
        throw error;
      }
    };
    return acc;
  }, {});
}

// node_modules/.pnpm/preact@10.11.3/node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f = {};
var e = [];
var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function s(n3, l3) {
  for (var u3 in l3)
    n3[u3] = l3[u3];
  return n3;
}
function a(n3) {
  var l3 = n3.parentNode;
  l3 && l3.removeChild(n3);
}
function v(n3, i3, t2, o4, r3) {
  var f3 = { type: n3, props: i3, key: t2, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
  return null == r3 && null != l.vnode && l.vnode(f3), f3;
}
function p(n3) {
  return n3.children;
}
function d(n3, l3) {
  this.props = n3, this.context = l3;
}
function _(n3, l3) {
  if (null == l3)
    return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u3; l3 < n3.__k.length; l3++)
    if (null != (u3 = n3.__k[l3]) && null != u3.__e)
      return u3.__e;
  return "function" == typeof n3.type ? _(n3) : null;
}
function k(n3) {
  var l3, u3;
  if (null != (n3 = n3.__) && null != n3.__c) {
    for (n3.__e = n3.__c.base = null, l3 = 0; l3 < n3.__k.length; l3++)
      if (null != (u3 = n3.__k[l3]) && null != u3.__e) {
        n3.__e = n3.__c.base = u3.__e;
        break;
      }
    return k(n3);
  }
}
function b(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n3; g.__r = t.length; )
    n3 = t.sort(function(n4, l3) {
      return n4.__v.__b - l3.__v.__b;
    }), t = [], n3.some(function(n4) {
      var l3, u3, i3, t2, o4, r3;
      n4.__d && (o4 = (t2 = (l3 = n4).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = s({}, t2)).__v = t2.__v + 1, j(r3, t2, i3, l3.__n, void 0 !== r3.ownerSVGElement, null != t2.__h ? [o4] : null, u3, null == o4 ? _(t2) : o4, t2.__h), z(u3, t2), t2.__e != o4 && k(t2)));
    });
}
function w(n3, l3, u3, i3, t2, o4, r3, c3, s3, a3) {
  var h2, y2, d3, k3, b3, g3, w3, x2 = i3 && i3.__k || e, C3 = x2.length;
  for (u3.__k = [], h2 = 0; h2 < l3.length; h2++)
    if (null != (k3 = u3.__k[h2] = null == (k3 = l3[h2]) || "boolean" == typeof k3 ? null : "string" == typeof k3 || "number" == typeof k3 || "bigint" == typeof k3 ? v(null, k3, null, null, k3) : Array.isArray(k3) ? v(p, { children: k3 }, null, null, null) : k3.__b > 0 ? v(k3.type, k3.props, k3.key, k3.ref ? k3.ref : null, k3.__v) : k3)) {
      if (k3.__ = u3, k3.__b = u3.__b + 1, null === (d3 = x2[h2]) || d3 && k3.key == d3.key && k3.type === d3.type)
        x2[h2] = void 0;
      else
        for (y2 = 0; y2 < C3; y2++) {
          if ((d3 = x2[y2]) && k3.key == d3.key && k3.type === d3.type) {
            x2[y2] = void 0;
            break;
          }
          d3 = null;
        }
      j(n3, k3, d3 = d3 || f, t2, o4, r3, c3, s3, a3), b3 = k3.__e, (y2 = k3.ref) && d3.ref != y2 && (w3 || (w3 = []), d3.ref && w3.push(d3.ref, null, k3), w3.push(y2, k3.__c || b3, k3)), null != b3 ? (null == g3 && (g3 = b3), "function" == typeof k3.type && k3.__k === d3.__k ? k3.__d = s3 = m(k3, s3, n3) : s3 = A(n3, k3, d3, x2, b3, s3), "function" == typeof u3.type && (u3.__d = s3)) : s3 && d3.__e == s3 && s3.parentNode != n3 && (s3 = _(d3));
    }
  for (u3.__e = g3, h2 = C3; h2--; )
    null != x2[h2] && N(x2[h2], x2[h2]);
  if (w3)
    for (h2 = 0; h2 < w3.length; h2++)
      M(w3[h2], w3[++h2], w3[++h2]);
}
function m(n3, l3, u3) {
  for (var i3, t2 = n3.__k, o4 = 0; t2 && o4 < t2.length; o4++)
    (i3 = t2[o4]) && (i3.__ = n3, l3 = "function" == typeof i3.type ? m(i3, l3, u3) : A(u3, i3, i3, t2, i3.__e, l3));
  return l3;
}
function A(n3, l3, u3, i3, t2, o4) {
  var r3, f3, e2;
  if (void 0 !== l3.__d)
    r3 = l3.__d, l3.__d = void 0;
  else if (null == u3 || t2 != o4 || null == t2.parentNode)
    n:
      if (null == o4 || o4.parentNode !== n3)
        n3.appendChild(t2), r3 = null;
      else {
        for (f3 = o4, e2 = 0; (f3 = f3.nextSibling) && e2 < i3.length; e2 += 1)
          if (f3 == t2)
            break n;
        n3.insertBefore(t2, o4), r3 = o4;
      }
  return void 0 !== r3 ? r3 : t2.nextSibling;
}
function C(n3, l3, u3, i3, t2) {
  var o4;
  for (o4 in u3)
    "children" === o4 || "key" === o4 || o4 in l3 || H(n3, o4, null, u3[o4], i3);
  for (o4 in l3)
    t2 && "function" != typeof l3[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u3[o4] === l3[o4] || H(n3, o4, l3[o4], u3[o4], i3);
}
function $(n3, l3, u3) {
  "-" === l3[0] ? n3.setProperty(l3, u3) : n3[l3] = null == u3 ? "" : "number" != typeof u3 || c.test(l3) ? u3 : u3 + "px";
}
function H(n3, l3, u3, i3, t2) {
  var o4;
  n:
    if ("style" === l3)
      if ("string" == typeof u3)
        n3.style.cssText = u3;
      else {
        if ("string" == typeof i3 && (n3.style.cssText = i3 = ""), i3)
          for (l3 in i3)
            u3 && l3 in u3 || $(n3.style, l3, "");
        if (u3)
          for (l3 in u3)
            i3 && u3[l3] === i3[l3] || $(n3.style, l3, u3[l3]);
      }
    else if ("o" === l3[0] && "n" === l3[1])
      o4 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n3 ? l3.toLowerCase().slice(2) : l3.slice(2), n3.l || (n3.l = {}), n3.l[l3 + o4] = u3, u3 ? i3 || n3.addEventListener(l3, o4 ? T : I, o4) : n3.removeEventListener(l3, o4 ? T : I, o4);
    else if ("dangerouslySetInnerHTML" !== l3) {
      if (t2)
        l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && l3 in n3)
        try {
          n3[l3] = null == u3 ? "" : u3;
          break n;
        } catch (n4) {
        }
      "function" == typeof u3 || (null == u3 || false === u3 && -1 == l3.indexOf("-") ? n3.removeAttribute(l3) : n3.setAttribute(l3, u3));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u3, i3, t2, o4, r3, f3, e2, c3) {
  var a3, h2, v3, y2, _4, k3, b3, g3, m3, x2, A2, C3, $2, H2, I2, T2 = u3.type;
  if (void 0 !== u3.constructor)
    return null;
  null != i3.__h && (c3 = i3.__h, e2 = u3.__e = i3.__e, u3.__h = null, r3 = [e2]), (a3 = l.__b) && a3(u3);
  try {
    n:
      if ("function" == typeof T2) {
        if (g3 = u3.props, m3 = (a3 = T2.contextType) && t2[a3.__c], x2 = a3 ? m3 ? m3.props.value : a3.__ : t2, i3.__c ? b3 = (h2 = u3.__c = i3.__c).__ = h2.__E : ("prototype" in T2 && T2.prototype.render ? u3.__c = h2 = new T2(g3, x2) : (u3.__c = h2 = new d(g3, x2), h2.constructor = T2, h2.render = O), m3 && m3.sub(h2), h2.props = g3, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t2, v3 = h2.__d = true, h2.__h = [], h2._sb = []), null == h2.__s && (h2.__s = h2.state), null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = s({}, h2.__s)), s(h2.__s, T2.getDerivedStateFromProps(g3, h2.__s))), y2 = h2.props, _4 = h2.state, v3)
          null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
        else {
          if (null == T2.getDerivedStateFromProps && g3 !== y2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(g3, x2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(g3, h2.__s, x2) || u3.__v === i3.__v) {
            for (h2.props = g3, h2.state = h2.__s, u3.__v !== i3.__v && (h2.__d = false), h2.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n4) {
              n4 && (n4.__ = u3);
            }), A2 = 0; A2 < h2._sb.length; A2++)
              h2.__h.push(h2._sb[A2]);
            h2._sb = [], h2.__h.length && f3.push(h2);
            break n;
          }
          null != h2.componentWillUpdate && h2.componentWillUpdate(g3, h2.__s, x2), null != h2.componentDidUpdate && h2.__h.push(function() {
            h2.componentDidUpdate(y2, _4, k3);
          });
        }
        if (h2.context = x2, h2.props = g3, h2.__v = u3, h2.__P = n3, C3 = l.__r, $2 = 0, "prototype" in T2 && T2.prototype.render) {
          for (h2.state = h2.__s, h2.__d = false, C3 && C3(u3), a3 = h2.render(h2.props, h2.state, h2.context), H2 = 0; H2 < h2._sb.length; H2++)
            h2.__h.push(h2._sb[H2]);
          h2._sb = [];
        } else
          do {
            h2.__d = false, C3 && C3(u3), a3 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
          } while (h2.__d && ++$2 < 25);
        h2.state = h2.__s, null != h2.getChildContext && (t2 = s(s({}, t2), h2.getChildContext())), v3 || null == h2.getSnapshotBeforeUpdate || (k3 = h2.getSnapshotBeforeUpdate(y2, _4)), I2 = null != a3 && a3.type === p && null == a3.key ? a3.props.children : a3, w(n3, Array.isArray(I2) ? I2 : [I2], u3, i3, t2, o4, r3, f3, e2, c3), h2.base = u3.__e, u3.__h = null, h2.__h.length && f3.push(h2), b3 && (h2.__E = h2.__ = null), h2.__e = false;
      } else
        null == r3 && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t2, o4, r3, f3, c3);
    (a3 = l.diffed) && a3(u3);
  } catch (n4) {
    u3.__v = null, (c3 || null != r3) && (u3.__e = e2, u3.__h = !!c3, r3[r3.indexOf(e2)] = null), l.__e(n4, u3, i3);
  }
}
function z(n3, u3) {
  l.__c && l.__c(u3, n3), n3.some(function(u4) {
    try {
      n3 = u4.__h, u4.__h = [], n3.some(function(n4) {
        n4.call(u4);
      });
    } catch (n4) {
      l.__e(n4, u4.__v);
    }
  });
}
function L(l3, u3, i3, t2, o4, r3, e2, c3) {
  var s3, h2, v3, y2 = i3.props, p3 = u3.props, d3 = u3.type, k3 = 0;
  if ("svg" === d3 && (o4 = true), null != r3) {
    for (; k3 < r3.length; k3++)
      if ((s3 = r3[k3]) && "setAttribute" in s3 == !!d3 && (d3 ? s3.localName === d3 : 3 === s3.nodeType)) {
        l3 = s3, r3[k3] = null;
        break;
      }
  }
  if (null == l3) {
    if (null === d3)
      return document.createTextNode(p3);
    l3 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), r3 = null, c3 = false;
  }
  if (null === d3)
    y2 === p3 || c3 && l3.data === p3 || (l3.data = p3);
  else {
    if (r3 = r3 && n.call(l3.childNodes), h2 = (y2 = i3.props || f).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c3) {
      if (null != r3)
        for (y2 = {}, k3 = 0; k3 < l3.attributes.length; k3++)
          y2[l3.attributes[k3].name] = l3.attributes[k3].value;
      (v3 || h2) && (v3 && (h2 && v3.__html == h2.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
    }
    if (C(l3, p3, y2, o4, c3), v3)
      u3.__k = [];
    else if (k3 = u3.props.children, w(l3, Array.isArray(k3) ? k3 : [k3], u3, i3, t2, o4 && "foreignObject" !== d3, r3, e2, r3 ? r3[0] : i3.__k && _(i3, 0), c3), null != r3)
      for (k3 = r3.length; k3--; )
        null != r3[k3] && a(r3[k3]);
    c3 || ("value" in p3 && void 0 !== (k3 = p3.value) && (k3 !== l3.value || "progress" === d3 && !k3 || "option" === d3 && k3 !== y2.value) && H(l3, "value", k3, y2.value, false), "checked" in p3 && void 0 !== (k3 = p3.checked) && k3 !== l3.checked && H(l3, "checked", k3, y2.checked, false));
  }
  return l3;
}
function M(n3, u3, i3) {
  try {
    "function" == typeof n3 ? n3(u3) : n3.current = u3;
  } catch (n4) {
    l.__e(n4, i3);
  }
}
function N(n3, u3, i3) {
  var t2, o4;
  if (l.unmount && l.unmount(n3), (t2 = n3.ref) && (t2.current && t2.current !== n3.__e || M(t2, null, u3)), null != (t2 = n3.__c)) {
    if (t2.componentWillUnmount)
      try {
        t2.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u3);
      }
    t2.base = t2.__P = null, n3.__c = void 0;
  }
  if (t2 = n3.__k)
    for (o4 = 0; o4 < t2.length; o4++)
      t2[o4] && N(t2[o4], u3, i3 || "function" != typeof n3.type);
  i3 || null == n3.__e || a(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
}
function O(n3, l3, u3) {
  return this.constructor(n3, u3);
}
n = e.slice, l = { __e: function(n3, l3, u3, i3) {
  for (var t2, o4, r3; l3 = l3.__; )
    if ((t2 = l3.__c) && !t2.__)
      try {
        if ((o4 = t2.constructor) && null != o4.getDerivedStateFromError && (t2.setState(o4.getDerivedStateFromError(n3)), r3 = t2.__d), null != t2.componentDidCatch && (t2.componentDidCatch(n3, i3 || {}), r3 = t2.__d), r3)
          return t2.__E = t2;
      } catch (l4) {
        n3 = l4;
      }
  throw n3;
} }, u = 0, i = function(n3) {
  return null != n3 && void 0 === n3.constructor;
}, d.prototype.setState = function(n3, l3) {
  var u3;
  u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u3), this.props)), n3 && s(u3, n3), null != n3 && this.__v && (l3 && this._sb.push(l3), b(this));
}, d.prototype.forceUpdate = function(n3) {
  this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
}, d.prototype.render = p, t = [], g.__r = 0, r = 0;

// node_modules/.pnpm/preact-render-to-string@5.2.3_preact@10.11.3/node_modules/preact-render-to-string/dist/index.mjs
var r2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
var n2 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
var o2 = /[\s\n\\/='"\0<>]/;
var i2 = /^xlink:?./;
var a2 = /["&<]/;
function l2(e2) {
  if (false === a2.test(e2 += ""))
    return e2;
  for (var t2 = 0, r3 = 0, n3 = "", o4 = ""; r3 < e2.length; r3++) {
    switch (e2.charCodeAt(r3)) {
      case 34:
        o4 = "&quot;";
        break;
      case 38:
        o4 = "&amp;";
        break;
      case 60:
        o4 = "&lt;";
        break;
      default:
        continue;
    }
    r3 !== t2 && (n3 += e2.slice(t2, r3)), n3 += o4, t2 = r3 + 1;
  }
  return r3 !== t2 && (n3 += e2.slice(t2, r3)), n3;
}
var s2 = function(e2, t2) {
  return String(e2).replace(/(\n+)/g, "$1" + (t2 || "	"));
};
var f2 = function(e2, t2, r3) {
  return String(e2).length > (t2 || 40) || !r3 && -1 !== String(e2).indexOf("\n") || -1 !== String(e2).indexOf("<");
};
var c2 = {};
var u2 = /([A-Z])/g;
function p2(e2) {
  var t2 = "";
  for (var n3 in e2) {
    var o4 = e2[n3];
    null != o4 && "" !== o4 && (t2 && (t2 += " "), t2 += "-" == n3[0] ? n3 : c2[n3] || (c2[n3] = n3.replace(u2, "-$1").toLowerCase()), t2 = "number" == typeof o4 && false === r2.test(n3) ? t2 + ": " + o4 + "px;" : t2 + ": " + o4 + ";");
  }
  return t2 || void 0;
}
function _2(e2, t2) {
  return Array.isArray(t2) ? t2.reduce(_2, e2) : null != t2 && false !== t2 && e2.push(t2), e2;
}
function d2() {
  this.__d = true;
}
function v2(e2, t2) {
  return { __v: e2, context: t2, props: e2.props, setState: d2, forceUpdate: d2, __d: true, __h: [] };
}
function h(e2, t2) {
  var r3 = e2.contextType, n3 = r3 && t2[r3.__c];
  return null != r3 ? n3 ? n3.props.value : r3.__ : t2;
}
var g2 = [];
function y(r3, a3, c3, u3, d3, m3) {
  if (null == r3 || "boolean" == typeof r3)
    return "";
  if ("object" != typeof r3)
    return l2(r3);
  var b3 = c3.pretty, x2 = b3 && "string" == typeof b3 ? b3 : "	";
  if (Array.isArray(r3)) {
    for (var k3 = "", S2 = 0; S2 < r3.length; S2++)
      b3 && S2 > 0 && (k3 += "\n"), k3 += y(r3[S2], a3, c3, u3, d3, m3);
    return k3;
  }
  var w3, C3 = r3.type, O3 = r3.props, j3 = false;
  if ("function" == typeof C3) {
    if (j3 = true, !c3.shallow || !u3 && false !== c3.renderRootComponent) {
      if (C3 === p) {
        var A2 = [];
        return _2(A2, r3.props.children), y(A2, a3, c3, false !== c3.shallowHighOrder, d3, m3);
      }
      var F, H2 = r3.__c = v2(r3, a3);
      l.__b && l.__b(r3);
      var M2 = l.__r;
      if (C3.prototype && "function" == typeof C3.prototype.render) {
        var L2 = h(C3, a3);
        (H2 = r3.__c = new C3(O3, L2)).__v = r3, H2._dirty = H2.__d = true, H2.props = O3, null == H2.state && (H2.state = {}), null == H2._nextState && null == H2.__s && (H2._nextState = H2.__s = H2.state), H2.context = L2, C3.getDerivedStateFromProps ? H2.state = Object.assign({}, H2.state, C3.getDerivedStateFromProps(H2.props, H2.state)) : H2.componentWillMount && (H2.componentWillMount(), H2.state = H2._nextState !== H2.state ? H2._nextState : H2.__s !== H2.state ? H2.__s : H2.state), M2 && M2(r3), F = H2.render(H2.props, H2.state, H2.context);
      } else
        for (var T2 = h(C3, a3), E = 0; H2.__d && E++ < 25; )
          H2.__d = false, M2 && M2(r3), F = C3.call(r3.__c, O3, T2);
      return H2.getChildContext && (a3 = Object.assign({}, a3, H2.getChildContext())), l.diffed && l.diffed(r3), y(F, a3, c3, false !== c3.shallowHighOrder, d3, m3);
    }
    C3 = (w3 = C3).displayName || w3 !== Function && w3.name || function(e2) {
      var t2 = (Function.prototype.toString.call(e2).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t2) {
        for (var r4 = -1, n3 = g2.length; n3--; )
          if (g2[n3] === e2) {
            r4 = n3;
            break;
          }
        r4 < 0 && (r4 = g2.push(e2) - 1), t2 = "UnnamedComponent" + r4;
      }
      return t2;
    }(w3);
  }
  var $2, D, N2 = "<" + C3;
  if (O3) {
    var P = Object.keys(O3);
    c3 && true === c3.sortAttributes && P.sort();
    for (var W = 0; W < P.length; W++) {
      var I2 = P[W], R = O3[I2];
      if ("children" !== I2) {
        if (!o2.test(I2) && (c3 && c3.allAttributes || "key" !== I2 && "ref" !== I2 && "__self" !== I2 && "__source" !== I2)) {
          if ("defaultValue" === I2)
            I2 = "value";
          else if ("defaultChecked" === I2)
            I2 = "checked";
          else if ("defaultSelected" === I2)
            I2 = "selected";
          else if ("className" === I2) {
            if (void 0 !== O3.class)
              continue;
            I2 = "class";
          } else
            d3 && i2.test(I2) && (I2 = I2.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I2) {
            if (O3.for)
              continue;
            I2 = "for";
          }
          "style" === I2 && R && "object" == typeof R && (R = p2(R)), "a" === I2[0] && "r" === I2[1] && "boolean" == typeof R && (R = String(R));
          var U = c3.attributeHook && c3.attributeHook(I2, R, a3, c3, j3);
          if (U || "" === U)
            N2 += U;
          else if ("dangerouslySetInnerHTML" === I2)
            D = R && R.__html;
          else if ("textarea" === C3 && "value" === I2)
            $2 = R;
          else if ((R || 0 === R || "" === R) && "function" != typeof R) {
            if (!(true !== R && "" !== R || (R = I2, c3 && c3.xml))) {
              N2 = N2 + " " + I2;
              continue;
            }
            if ("value" === I2) {
              if ("select" === C3) {
                m3 = R;
                continue;
              }
              "option" === C3 && m3 == R && void 0 === O3.selected && (N2 += " selected");
            }
            N2 = N2 + " " + I2 + '="' + l2(R) + '"';
          }
        }
      } else
        $2 = R;
    }
  }
  if (b3) {
    var V = N2.replace(/\n\s*/, " ");
    V === N2 || ~V.indexOf("\n") ? b3 && ~N2.indexOf("\n") && (N2 += "\n") : N2 = V;
  }
  if (N2 += ">", o2.test(C3))
    throw new Error(C3 + " is not a valid HTML tag name in " + N2);
  var q, z3 = n2.test(C3) || c3.voidElements && c3.voidElements.test(C3), Z = [];
  if (D)
    b3 && f2(D) && (D = "\n" + x2 + s2(D, x2)), N2 += D;
  else if (null != $2 && _2(q = [], $2).length) {
    for (var B = b3 && ~N2.indexOf("\n"), G = false, J = 0; J < q.length; J++) {
      var K = q[J];
      if (null != K && false !== K) {
        var Q = y(K, a3, c3, true, "svg" === C3 || "foreignObject" !== C3 && d3, m3);
        if (b3 && !B && f2(Q) && (B = true), Q)
          if (b3) {
            var X = Q.length > 0 && "<" != Q[0];
            G && X ? Z[Z.length - 1] += Q : Z.push(Q), G = X;
          } else
            Z.push(Q);
      }
    }
    if (b3 && B)
      for (var Y = Z.length; Y--; )
        Z[Y] = "\n" + x2 + s2(Z[Y], x2);
  }
  if (Z.length || D)
    N2 += Z.join("");
  else if (c3 && c3.xml)
    return N2.substring(0, N2.length - 1) + " />";
  return !z3 || q || D ? (b3 && ~N2.indexOf("\n") && (N2 += "\n"), N2 = N2 + "</" + C3 + ">") : N2 = N2.replace(/>$/, " />"), N2;
}
var m2 = { shallow: true };
k2.render = k2;
var b2 = function(e2, t2) {
  return k2(e2, t2, m2);
};
var x = [];
function k2(e2, r3, n3) {
  r3 = r3 || {};
  var o4, i3 = l.__s;
  return l.__s = true, o4 = n3 && (n3.pretty || n3.voidElements || n3.sortAttributes || n3.shallow || n3.allAttributes || n3.xml || n3.attributeHook) ? y(e2, r3, n3) : j2(e2, r3, false, void 0), l.__c && l.__c(e2, x), l.__s = i3, x.length = 0, o4;
}
function S(e2, t2) {
  return "className" === e2 ? "class" : "htmlFor" === e2 ? "for" : "defaultValue" === e2 ? "value" : "defaultChecked" === e2 ? "checked" : "defaultSelected" === e2 ? "selected" : t2 && i2.test(e2) ? e2.toLowerCase().replace(/^xlink:?/, "xlink:") : e2;
}
function w2(e2, t2) {
  return "style" === e2 && null != t2 && "object" == typeof t2 ? p2(t2) : "a" === e2[0] && "r" === e2[1] && "boolean" == typeof t2 ? String(t2) : t2;
}
var C2 = Array.isArray;
var O2 = Object.assign;
function j2(r3, i3, a3, s3) {
  if (null == r3 || true === r3 || false === r3 || "" === r3)
    return "";
  if ("object" != typeof r3)
    return l2(r3);
  if (C2(r3)) {
    for (var f3 = "", c3 = 0; c3 < r3.length; c3++)
      f3 += j2(r3[c3], i3, a3, s3);
    return f3;
  }
  l.__b && l.__b(r3);
  var u3 = r3.type, p3 = r3.props;
  if ("function" == typeof u3) {
    if (u3 === p)
      return j2(r3.props.children, i3, a3, s3);
    var _4;
    _4 = u3.prototype && "function" == typeof u3.prototype.render ? function(e2, r4) {
      var n3 = e2.type, o4 = h(n3, r4), i4 = new n3(e2.props, o4);
      e2.__c = i4, i4.__v = e2, i4.__d = true, i4.props = e2.props, null == i4.state && (i4.state = {}), null == i4.__s && (i4.__s = i4.state), i4.context = o4, n3.getDerivedStateFromProps ? i4.state = O2({}, i4.state, n3.getDerivedStateFromProps(i4.props, i4.state)) : i4.componentWillMount && (i4.componentWillMount(), i4.state = i4.__s !== i4.state ? i4.__s : i4.state);
      var a4 = l.__r;
      return a4 && a4(e2), i4.render(i4.props, i4.state, i4.context);
    }(r3, i3) : function(e2, r4) {
      var n3, o4 = v2(e2, r4), i4 = h(e2.type, r4);
      e2.__c = o4;
      for (var a4 = l.__r, l3 = 0; o4.__d && l3++ < 25; )
        o4.__d = false, a4 && a4(e2), n3 = e2.type.call(o4, e2.props, i4);
      return n3;
    }(r3, i3);
    var d3 = r3.__c;
    d3.getChildContext && (i3 = O2({}, i3, d3.getChildContext()));
    var g3 = j2(_4, i3, a3, s3);
    return l.diffed && l.diffed(r3), g3;
  }
  var y2, m3, b3 = "<";
  if (b3 += u3, p3)
    for (var x2 in y2 = p3.children, p3) {
      var k3 = p3[x2];
      if (!("key" === x2 || "ref" === x2 || "__self" === x2 || "__source" === x2 || "children" === x2 || "className" === x2 && "class" in p3 || "htmlFor" === x2 && "for" in p3 || o2.test(x2))) {
        if (k3 = w2(x2 = S(x2, a3), k3), "dangerouslySetInnerHTML" === x2)
          m3 = k3 && k3.__html;
        else if ("textarea" === u3 && "value" === x2)
          y2 = k3;
        else if ((k3 || 0 === k3 || "" === k3) && "function" != typeof k3) {
          if (true === k3 || "" === k3) {
            k3 = x2, b3 = b3 + " " + x2;
            continue;
          }
          if ("value" === x2) {
            if ("select" === u3) {
              s3 = k3;
              continue;
            }
            "option" !== u3 || s3 != k3 || "selected" in p3 || (b3 += " selected");
          }
          b3 = b3 + " " + x2 + '="' + l2(k3) + '"';
        }
      }
    }
  var A2 = b3;
  if (b3 += ">", o2.test(u3))
    throw new Error(u3 + " is not a valid HTML tag name in " + b3);
  var F = "", H2 = false;
  if (m3)
    F += m3, H2 = true;
  else if ("string" == typeof y2)
    F += l2(y2), H2 = true;
  else if (C2(y2))
    for (var M2 = 0; M2 < y2.length; M2++) {
      var L2 = y2[M2];
      if (null != L2 && false !== L2) {
        var T2 = j2(L2, i3, "svg" === u3 || "foreignObject" !== u3 && a3, s3);
        T2 && (F += T2, H2 = true);
      }
    }
  else if (null != y2 && false !== y2 && true !== y2) {
    var E = j2(y2, i3, "svg" === u3 || "foreignObject" !== u3 && a3, s3);
    E && (F += E, H2 = true);
  }
  if (l.diffed && l.diffed(r3), H2)
    b3 += F;
  else if (n2.test(u3))
    return A2 + " />";
  return b3 + "</" + u3 + ">";
}
k2.shallowRender = b2;

// node_modules/.pnpm/preact@10.11.3/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var _3 = 0;
function o3(o4, e2, n3, t2, f3) {
  var l3, s3, u3 = {};
  for (s3 in e2)
    "ref" == s3 ? l3 = e2[s3] : u3[s3] = e2[s3];
  var a3 = { type: o4, props: u3, key: n3, ref: l3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_3, __source: f3, __self: t2 };
  if ("function" == typeof o4 && (l3 = o4.defaultProps))
    for (s3 in l3)
      void 0 === u3[s3] && (u3[s3] = l3[s3]);
  return l.vnode && l.vnode(a3), a3;
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/error.js
function ErrorPage(props) {
  const { url, error = "default", theme } = props;
  const signinPageUrl = `${url}/signin`;
  const errors = {
    default: {
      status: 200,
      heading: "Error",
      message: o3("p", { children: o3("a", { className: "site", href: url?.origin, children: url?.host }) })
    },
    Configuration: {
      status: 500,
      heading: "Server error",
      message: o3("div", { children: [o3("p", { children: "There is a problem with the server configuration." }), o3("p", { children: "Check the server logs for more information." })] })
    },
    AccessDenied: {
      status: 403,
      heading: "Access Denied",
      message: o3("div", { children: [o3("p", { children: "You do not have permission to sign in." }), o3("p", { children: o3("a", { className: "button", href: signinPageUrl, children: "Sign in" }) })] })
    },
    Verification: {
      status: 403,
      heading: "Unable to sign in",
      message: o3("div", { children: [o3("p", { children: "The sign in link is no longer valid." }), o3("p", { children: "It may have been used already or it may have expired." })] }),
      signin: o3("a", { className: "button", href: signinPageUrl, children: "Sign in" })
    }
  };
  const { status, heading, message: message2, signin } = errors[error] ?? errors.default;
  return {
    status,
    html: o3("div", { className: "error", children: [theme?.brandColor && o3("style", { dangerouslySetInnerHTML: {
      __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `
    } }), o3("div", { className: "card", children: [theme?.logo && o3("img", { src: theme?.logo, alt: "Logo", className: "logo" }), o3("h1", { children: heading }), o3("div", { className: "message", children: message2 }), signin] })] })
  };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/signin.js
var signinErrors = {
  default: "Unable to sign in.",
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallbackError: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page."
};
function hexToRgba(hex, alpha = 1) {
  if (!hex) {
    return;
  }
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const bigint = parseInt(hex, 16);
  const r3 = bigint >> 16 & 255;
  const g3 = bigint >> 8 & 255;
  const b3 = bigint & 255;
  alpha = Math.min(Math.max(alpha, 0), 1);
  const rgba = `rgba(${r3}, ${g3}, ${b3}, ${alpha})`;
  return rgba;
}
function SigninPage(props) {
  const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType } = props;
  if (typeof document !== "undefined" && theme?.brandColor) {
    document.documentElement.style.setProperty("--brand-color", theme.brandColor);
  }
  if (typeof document !== "undefined" && theme?.buttonText) {
    document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
  }
  const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
  const providerLogoPath = "https://authjs.dev/img/providers";
  return o3("div", { className: "signin", children: [theme?.brandColor && o3("style", { dangerouslySetInnerHTML: {
    __html: `:root {--brand-color: ${theme.brandColor}}`
  } }), theme?.buttonText && o3("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
  } }), o3("div", { className: "card", children: [error && o3("div", { className: "error", children: o3("p", { children: error }) }), theme?.logo && o3("img", { src: theme.logo, alt: "Logo", className: "logo" }), providers.map((provider, i3) => {
    let bg, text, logo, logoDark, bgDark, textDark;
    if (provider.type === "oauth" || provider.type === "oidc") {
      ;
      ({
        bg = "",
        text = "",
        logo = "",
        bgDark = bg,
        textDark = text,
        logoDark = ""
      } = provider.style ?? {});
      logo = logo.startsWith("/") ? providerLogoPath + logo : logo;
      logoDark = logoDark.startsWith("/") ? providerLogoPath + logoDark : logoDark || logo;
      logoDark || (logoDark = logo);
    }
    return o3("div", { className: "provider", children: [provider.type === "oauth" || provider.type === "oidc" ? o3("form", { action: provider.signinUrl, method: "POST", children: [o3("input", { type: "hidden", name: "csrfToken", value: csrfToken }), callbackUrl && o3("input", { type: "hidden", name: "callbackUrl", value: callbackUrl }), o3("button", { type: "submit", className: "button", style: {
      "--provider-bg": bg,
      "--provider-dark-bg": bgDark,
      "--provider-color": text,
      "--provider-dark-color": textDark,
      "--provider-bg-hover": hexToRgba(bg, 0.8),
      "--provider-dark-bg-hover": hexToRgba(bgDark, 0.8)
    }, tabIndex: 0, children: [logo && o3("img", { loading: "lazy", height: 24, width: 24, id: "provider-logo", src: logo }), logoDark && o3("img", { loading: "lazy", height: 24, width: 24, id: "provider-logo-dark", src: logoDark }), o3("span", { children: ["Sign in with ", provider.name] })] })] }) : null, (provider.type === "email" || provider.type === "credentials") && i3 > 0 && providers[i3 - 1].type !== "email" && providers[i3 - 1].type !== "credentials" && o3("hr", {}), provider.type === "email" && o3("form", { action: provider.signinUrl, method: "POST", children: [o3("input", { type: "hidden", name: "csrfToken", value: csrfToken }), o3("label", { className: "section-header", htmlFor: `input-email-for-${provider.id}-provider`, children: "Email" }), o3("input", { id: `input-email-for-${provider.id}-provider`, autoFocus: true, type: "email", name: "email", value: email, placeholder: "email@example.com", required: true }), o3("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] }), provider.type === "credentials" && o3("form", { action: provider.callbackUrl, method: "POST", children: [o3("input", { type: "hidden", name: "csrfToken", value: csrfToken }), Object.keys(provider.credentials).map((credential) => {
      return o3("div", { children: [o3("label", { className: "section-header", htmlFor: `input-${credential}-for-${provider.id}-provider`, children: provider.credentials[credential].label ?? credential }), o3("input", { name: credential, id: `input-${credential}-for-${provider.id}-provider`, type: provider.credentials[credential].type ?? "text", placeholder: provider.credentials[credential].placeholder ?? "", ...provider.credentials[credential] })] }, `input-group-${provider.id}`);
    }), o3("button", { id: "submitButton", type: "submit", tabIndex: 0, children: ["Sign in with ", provider.name] })] }), (provider.type === "email" || provider.type === "credentials") && i3 + 1 < providers.length && o3("hr", {})] }, provider.id);
  })] })] });
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/signout.js
function SignoutPage(props) {
  const { url, csrfToken, theme } = props;
  return o3("div", { className: "signout", children: [theme?.brandColor && o3("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
  } }), theme?.buttonText && o3("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
  } }), o3("div", { className: "card", children: [theme?.logo && o3("img", { src: theme.logo, alt: "Logo", className: "logo" }), o3("h1", { children: "Signout" }), o3("p", { children: "Are you sure you want to sign out?" }), o3("form", { action: `${url}/signout`, method: "POST", children: [o3("input", { type: "hidden", name: "csrfToken", value: csrfToken }), o3("button", { id: "submitButton", type: "submit", children: "Sign out" })] })] })] });
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/styles.js
var styles_default = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
}

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
  }

  button,
  a.button {
    color: var(--provider-dark-color, var(--color-primary));
    background-color: var(--provider-dark-bg, var(--color-background));
  }
    button:hover, a.button:hover {
      background-color: var(--provider-dark-bg-hover, var(--color-background-hover)) !important;
    }
  #provider-logo {
    display: none !important;
  }
  #provider-logo-dark {
    width: 25px;
    display: block !important;
  }
}
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

input[type]:focus {
    box-shadow: none;
  }

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button span {
  flex-grow: 1;
}

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg);
  font-size: 1.1rem;
  min-height: 62px;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  transition: all 0.1s ease-in-out;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover, a.button:hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

button:active, a.button:active {
    cursor: pointer;
  }

button #provider-logo, a.button #provider-logo {
    width: 25px;
    display: block;
  }

button #provider-logo-dark, a.button #provider-logo-dark {
    display: none;
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(--button-hover-bg, var(--color-info-hover)) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 2rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}
@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/verify-request.js
function VerifyRequestPage(props) {
  const { url, theme } = props;
  return o3("div", { className: "verify-request", children: [theme.brandColor && o3("style", { dangerouslySetInnerHTML: {
    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
  } }), o3("div", { className: "card", children: [theme.logo && o3("img", { src: theme.logo, alt: "Logo", className: "logo" }), o3("h1", { children: "Check your email" }), o3("p", { children: "A sign in link has been sent to your email address." }), o3("p", { children: o3("a", { className: "site", href: url.origin, children: url.host }) })] })] });
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/pages/index.js
function send({ html, title, status, cookies, theme }) {
  return {
    cookies,
    status,
    headers: { "Content-Type": "text/html" },
    body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${styles_default}</style><title>${title}</title></head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${k2(html)}</div></body></html>`
  };
}
function renderPage(params) {
  const { url, theme, query, cookies, pages } = params;
  return {
    csrf(skip, options, cookies2) {
      if (!skip) {
        return {
          headers: { "Content-Type": "application/json" },
          body: { csrfToken: options.csrfToken },
          cookies: cookies2
        };
      }
      options.logger.warn("csrf-disabled");
      cookies2.push({
        name: options.cookies.csrfToken.name,
        value: "",
        options: { ...options.cookies.csrfToken.options, maxAge: 0 }
      });
      return { status: 404, cookies: cookies2 };
    },
    providers(providers) {
      return {
        headers: { "Content-Type": "application/json" },
        body: providers.reduce((acc, { id, name, type, signinUrl, callbackUrl }) => {
          acc[id] = { id, name, type, signinUrl, callbackUrl };
          return acc;
        }, {})
      };
    },
    signin(error) {
      if (pages?.signIn) {
        let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl: params.callbackUrl ?? "/" })}`;
        if (error)
          signinUrl = `${signinUrl}&${new URLSearchParams({ error })}`;
        return { redirect: signinUrl, cookies };
      }
      return send({
        cookies,
        theme,
        html: SigninPage({
          csrfToken: params.csrfToken,
          // We only want to render providers
          providers: params.providers?.filter((provider) => (
            // Always render oauth and email type providers
            ["email", "oauth", "oidc"].includes(provider.type) || // Only render credentials type provider if credentials are defined
            provider.type === "credentials" && provider.credentials || // Don't render other provider types
            false
          )),
          callbackUrl: params.callbackUrl,
          theme: params.theme,
          error,
          ...query
        }),
        title: "Sign In"
      });
    },
    signout() {
      if (pages?.signOut)
        return { redirect: pages.signOut, cookies };
      return send({
        cookies,
        theme,
        html: SignoutPage({ csrfToken: params.csrfToken, url, theme }),
        title: "Sign Out"
      });
    },
    verifyRequest(props) {
      if (pages?.verifyRequest)
        return { redirect: pages.verifyRequest, cookies };
      return send({
        cookies,
        theme,
        html: VerifyRequestPage({ url, theme, ...props }),
        title: "Verify Request"
      });
    },
    error(error) {
      if (pages?.error) {
        return {
          redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
          cookies
        };
      }
      return send({
        cookies,
        theme,
        // @ts-expect-error fix error type
        ...ErrorPage({ url, theme, error }),
        title: "Error"
      });
    }
  };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/utils/date.js
function fromDate(time, date = Date.now()) {
  return new Date(date + time * 1e3);
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/callback/handle-login.js
async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
  if (!_account?.providerAccountId || !_account.type)
    throw new Error("Missing or invalid provider account");
  if (!["email", "oauth", "oidc"].includes(_account.type))
    throw new Error("Provider not supported");
  const { adapter, jwt: jwt2, events, session: { strategy: sessionStrategy, generateSessionToken } } = options;
  if (!adapter) {
    return { user: _profile, account: _account };
  }
  const profile = _profile;
  let account = _account;
  const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession } = adapter;
  let session2 = null;
  let user = null;
  let isNewUser = false;
  const useJwtSession = sessionStrategy === "jwt";
  if (sessionToken) {
    if (useJwtSession) {
      try {
        const salt = options.cookies.sessionToken.name;
        session2 = await jwt2.decode({ ...jwt2, token: sessionToken, salt });
        if (session2 && "sub" in session2 && session2.sub) {
          user = await getUser(session2.sub);
        }
      } catch {
      }
    } else {
      const userAndSession = await getSessionAndUser(sessionToken);
      if (userAndSession) {
        session2 = userAndSession.session;
        user = userAndSession.user;
      }
    }
  }
  if (account.type === "email") {
    const userByEmail = await getUserByEmail(profile.email);
    if (userByEmail) {
      if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
        await deleteSession(sessionToken);
      }
      user = await updateUser({ id: userByEmail.id, emailVerified: /* @__PURE__ */ new Date() });
      await events.updateUser?.({ user });
    } else {
      const { id: _4, ...newUser } = { ...profile, emailVerified: /* @__PURE__ */ new Date() };
      user = await createUser(newUser);
      await events.createUser?.({ user });
      isNewUser = true;
    }
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: user.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user, isNewUser };
  }
  const userByAccount = await getUserByAccount({
    providerAccountId: account.providerAccountId,
    provider: account.provider
  });
  if (userByAccount) {
    if (user) {
      if (userByAccount.id === user.id) {
        return { session: session2, user, isNewUser };
      }
      throw new OAuthAccountNotLinked("The account is already associated with another user", { provider: account.provider });
    }
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: userByAccount.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user: userByAccount, isNewUser };
  } else {
    const { provider: p3 } = options;
    const { type, provider, providerAccountId, userId, ...tokenSet } = account;
    const defaults2 = { providerAccountId, provider, type, userId };
    account = Object.assign(p3.account(tokenSet) ?? {}, defaults2);
    if (user) {
      await linkAccount({ ...account, userId: user.id });
      await events.linkAccount?.({ user, account, profile });
      return { session: session2, user, isNewUser };
    }
    const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
    if (userByEmail) {
      const provider2 = options.provider;
      if (provider2?.allowDangerousEmailAccountLinking) {
        user = userByEmail;
      } else {
        throw new OAuthAccountNotLinked("Another account already exists with the same e-mail address", { provider: account.provider });
      }
    } else {
      const { id: _4, ...newUser } = { ...profile, emailVerified: null };
      user = await createUser(newUser);
    }
    await events.createUser?.({ user });
    await linkAccount({ ...account, userId: user.id });
    await events.linkAccount?.({ user, account, profile });
    session2 = useJwtSession ? {} : await createSession({
      sessionToken: generateSessionToken(),
      userId: user.id,
      expires: fromDate(options.session.maxAge)
    });
    return { session: session2, user, isNewUser: true };
  }
}

// node_modules/.pnpm/oauth4webapi@2.10.3/node_modules/oauth4webapi/build/index.js
var USER_AGENT2;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "oauth4webapi";
  const VERSION3 = "v2.10.3";
  USER_AGENT2 = `${NAME}/${VERSION3}`;
}
function looseInstanceOf(input, expected) {
  if (input == null) {
    return false;
  }
  try {
    return input instanceof expected || Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag];
  } catch {
    return false;
  }
}
var clockSkew = Symbol();
var clockTolerance = Symbol();
var customFetch = Symbol();
var useMtlsAlias = Symbol();
var encoder2 = new TextEncoder();
var decoder2 = new TextDecoder();
function buf(input) {
  if (typeof input === "string") {
    return encoder2.encode(input);
  }
  return decoder2.decode(input);
}
var CHUNK_SIZE2 = 32768;
function encodeBase64Url(input) {
  if (input instanceof ArrayBuffer) {
    input = new Uint8Array(input);
  }
  const arr = [];
  for (let i3 = 0; i3 < input.byteLength; i3 += CHUNK_SIZE2) {
    arr.push(String.fromCharCode.apply(null, input.subarray(i3, i3 + CHUNK_SIZE2)));
  }
  return btoa(arr.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function decodeBase64Url(input) {
  try {
    const binary = atob(input.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i3 = 0; i3 < binary.length; i3++) {
      bytes[i3] = binary.charCodeAt(i3);
    }
    return bytes;
  } catch (cause) {
    throw new OPE("The input to be decoded is not correctly encoded.", { cause });
  }
}
function b64u(input) {
  if (typeof input === "string") {
    return decodeBase64Url(input);
  }
  return encodeBase64Url(input);
}
var LRU = class {
  constructor(maxSize) {
    this.cache = /* @__PURE__ */ new Map();
    this._cache = /* @__PURE__ */ new Map();
    this.maxSize = maxSize;
  }
  get(key) {
    let v3 = this.cache.get(key);
    if (v3) {
      return v3;
    }
    if (v3 = this._cache.get(key)) {
      this.update(key, v3);
      return v3;
    }
    return void 0;
  }
  has(key) {
    return this.cache.has(key) || this._cache.has(key);
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
    } else {
      this.update(key, value);
    }
    return this;
  }
  delete(key) {
    if (this.cache.has(key)) {
      return this.cache.delete(key);
    }
    if (this._cache.has(key)) {
      return this._cache.delete(key);
    }
    return false;
  }
  update(key, value) {
    this.cache.set(key, value);
    if (this.cache.size >= this.maxSize) {
      this._cache = this.cache;
      this.cache = /* @__PURE__ */ new Map();
    }
  }
};
var UnsupportedOperationError = class extends Error {
  constructor(message2) {
    super(message2 ?? "operation not supported");
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var OperationProcessingError = class extends Error {
  constructor(message2, options) {
    super(message2, options);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var OPE = OperationProcessingError;
var dpopNonces = new LRU(100);
function isCryptoKey2(key) {
  return key instanceof CryptoKey;
}
function isPrivateKey(key) {
  return isCryptoKey2(key) && key.type === "private";
}
function isPublicKey(key) {
  return isCryptoKey2(key) && key.type === "public";
}
function processDpopNonce(response) {
  try {
    const nonce2 = response.headers.get("dpop-nonce");
    if (nonce2) {
      dpopNonces.set(new URL(response.url).origin, nonce2);
    }
  } catch {
  }
  return response;
}
function isJsonObject(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return false;
  }
  return true;
}
function prepareHeaders(input) {
  if (looseInstanceOf(input, Headers)) {
    input = Object.fromEntries(input.entries());
  }
  const headers = new Headers(input);
  if (USER_AGENT2 && !headers.has("user-agent")) {
    headers.set("user-agent", USER_AGENT2);
  }
  if (headers.has("authorization")) {
    throw new TypeError('"options.headers" must not include the "authorization" header name');
  }
  if (headers.has("dpop")) {
    throw new TypeError('"options.headers" must not include the "dpop" header name');
  }
  return headers;
}
function signal(value) {
  if (typeof value === "function") {
    value = value();
  }
  if (!(value instanceof AbortSignal)) {
    throw new TypeError('"options.signal" must return or be an instance of AbortSignal');
  }
  return value;
}
async function discoveryRequest(issuerIdentifier, options) {
  if (!(issuerIdentifier instanceof URL)) {
    throw new TypeError('"issuerIdentifier" must be an instance of URL');
  }
  if (issuerIdentifier.protocol !== "https:" && issuerIdentifier.protocol !== "http:") {
    throw new TypeError('"issuer.protocol" must be "https:" or "http:"');
  }
  const url = new URL(issuerIdentifier.href);
  switch (options?.algorithm) {
    case void 0:
    case "oidc":
      url.pathname = `${url.pathname}/.well-known/openid-configuration`.replace("//", "/");
      break;
    case "oauth2":
      if (url.pathname === "/") {
        url.pathname = ".well-known/oauth-authorization-server";
      } else {
        url.pathname = `.well-known/oauth-authorization-server/${url.pathname}`.replace("//", "/");
      }
      break;
    default:
      throw new TypeError('"options.algorithm" must be "oidc" (default), or "oauth2"');
  }
  const headers = prepareHeaders(options?.headers);
  headers.set("accept", "application/json");
  return (options?.[customFetch] || fetch)(url.href, {
    headers: Object.fromEntries(headers.entries()),
    method: "GET",
    redirect: "manual",
    signal: options?.signal ? signal(options.signal) : null
  }).then(processDpopNonce);
}
function validateString(input) {
  return typeof input === "string" && input.length !== 0;
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
  if (!(expectedIssuerIdentifier instanceof URL)) {
    throw new TypeError('"expectedIssuer" must be an instance of URL');
  }
  if (!looseInstanceOf(response, Response)) {
    throw new TypeError('"response" must be an instance of Response');
  }
  if (response.status !== 200) {
    throw new OPE('"response" is not a conform Authorization Server Metadata response');
  }
  assertReadableResponse(response);
  let json;
  try {
    json = await response.json();
  } catch (cause) {
    throw new OPE('failed to parse "response" body as JSON', { cause });
  }
  if (!isJsonObject(json)) {
    throw new OPE('"response" body must be a top level object');
  }
  if (!validateString(json.issuer)) {
    throw new OPE('"response" body "issuer" property must be a non-empty string');
  }
  if (new URL(json.issuer).href !== expectedIssuerIdentifier.href) {
    throw new OPE('"response" body "issuer" does not match "expectedIssuer"');
  }
  return json;
}
function randomBytes() {
  return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
  return randomBytes();
}
function generateRandomState() {
  return randomBytes();
}
function generateRandomNonce() {
  return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
  if (!validateString(codeVerifier)) {
    throw new TypeError('"codeVerifier" must be a non-empty string');
  }
  return b64u(await crypto.subtle.digest("SHA-256", buf(codeVerifier)));
}
function getKeyAndKid(input) {
  if (input instanceof CryptoKey) {
    return { key: input };
  }
  if (!(input?.key instanceof CryptoKey)) {
    return {};
  }
  if (input.kid !== void 0 && !validateString(input.kid)) {
    throw new TypeError('"kid" must be a non-empty string');
  }
  return { key: input.key, kid: input.kid };
}
function formUrlEncode(token) {
  return encodeURIComponent(token).replace(/%20/g, "+");
}
function clientSecretBasic(clientId, clientSecret) {
  const username = formUrlEncode(clientId);
  const password = formUrlEncode(clientSecret);
  const credentials = btoa(`${username}:${password}`);
  return `Basic ${credentials}`;
}
function psAlg(key) {
  switch (key.algorithm.hash.name) {
    case "SHA-256":
      return "PS256";
    case "SHA-384":
      return "PS384";
    case "SHA-512":
      return "PS512";
    default:
      throw new UnsupportedOperationError("unsupported RsaHashedKeyAlgorithm hash name");
  }
}
function rsAlg(key) {
  switch (key.algorithm.hash.name) {
    case "SHA-256":
      return "RS256";
    case "SHA-384":
      return "RS384";
    case "SHA-512":
      return "RS512";
    default:
      throw new UnsupportedOperationError("unsupported RsaHashedKeyAlgorithm hash name");
  }
}
function esAlg(key) {
  switch (key.algorithm.namedCurve) {
    case "P-256":
      return "ES256";
    case "P-384":
      return "ES384";
    case "P-521":
      return "ES512";
    default:
      throw new UnsupportedOperationError("unsupported EcKeyAlgorithm namedCurve");
  }
}
function keyToJws(key) {
  switch (key.algorithm.name) {
    case "RSA-PSS":
      return psAlg(key);
    case "RSASSA-PKCS1-v1_5":
      return rsAlg(key);
    case "ECDSA":
      return esAlg(key);
    case "Ed25519":
    case "Ed448":
      return "EdDSA";
    default:
      throw new UnsupportedOperationError("unsupported CryptoKey algorithm name");
  }
}
function getClockSkew(client) {
  const skew = client?.[clockSkew];
  return typeof skew === "number" && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
  const tolerance = client?.[clockTolerance];
  return typeof tolerance === "number" && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1 ? tolerance : 30;
}
function epochTime() {
  return Math.floor(Date.now() / 1e3);
}
function clientAssertion(as, client) {
  const now2 = epochTime() + getClockSkew(client);
  return {
    jti: randomBytes(),
    aud: [as.issuer, as.token_endpoint],
    exp: now2 + 60,
    iat: now2,
    nbf: now2,
    iss: client.client_id,
    sub: client.client_id
  };
}
async function privateKeyJwt(as, client, key, kid) {
  return jwt({
    alg: keyToJws(key),
    kid
  }, clientAssertion(as, client), key);
}
function assertAs(as) {
  if (typeof as !== "object" || as === null) {
    throw new TypeError('"as" must be an object');
  }
  if (!validateString(as.issuer)) {
    throw new TypeError('"as.issuer" property must be a non-empty string');
  }
  return true;
}
function assertClient(client) {
  if (typeof client !== "object" || client === null) {
    throw new TypeError('"client" must be an object');
  }
  if (!validateString(client.client_id)) {
    throw new TypeError('"client.client_id" property must be a non-empty string');
  }
  return true;
}
function assertClientSecret(clientSecret) {
  if (!validateString(clientSecret)) {
    throw new TypeError('"client.client_secret" property must be a non-empty string');
  }
  return clientSecret;
}
function assertNoClientPrivateKey(clientAuthMethod, clientPrivateKey) {
  if (clientPrivateKey !== void 0) {
    throw new TypeError(`"options.clientPrivateKey" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
  }
}
function assertNoClientSecret(clientAuthMethod, clientSecret) {
  if (clientSecret !== void 0) {
    throw new TypeError(`"client.client_secret" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
  }
}
async function clientAuthentication(as, client, body, headers, clientPrivateKey) {
  body.delete("client_secret");
  body.delete("client_assertion_type");
  body.delete("client_assertion");
  switch (client.token_endpoint_auth_method) {
    case void 0:
    case "client_secret_basic": {
      assertNoClientPrivateKey("client_secret_basic", clientPrivateKey);
      headers.set("authorization", clientSecretBasic(client.client_id, assertClientSecret(client.client_secret)));
      break;
    }
    case "client_secret_post": {
      assertNoClientPrivateKey("client_secret_post", clientPrivateKey);
      body.set("client_id", client.client_id);
      body.set("client_secret", assertClientSecret(client.client_secret));
      break;
    }
    case "private_key_jwt": {
      assertNoClientSecret("private_key_jwt", client.client_secret);
      if (clientPrivateKey === void 0) {
        throw new TypeError('"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"');
      }
      const { key, kid } = getKeyAndKid(clientPrivateKey);
      if (!isPrivateKey(key)) {
        throw new TypeError('"options.clientPrivateKey.key" must be a private CryptoKey');
      }
      body.set("client_id", client.client_id);
      body.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
      body.set("client_assertion", await privateKeyJwt(as, client, key, kid));
      break;
    }
    case "tls_client_auth":
    case "self_signed_tls_client_auth":
    case "none": {
      assertNoClientSecret(client.token_endpoint_auth_method, client.client_secret);
      assertNoClientPrivateKey(client.token_endpoint_auth_method, clientPrivateKey);
      body.set("client_id", client.client_id);
      break;
    }
    default:
      throw new UnsupportedOperationError("unsupported client token_endpoint_auth_method");
  }
}
async function jwt(header, claimsSet, key) {
  if (!key.usages.includes("sign")) {
    throw new TypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"');
  }
  const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(claimsSet)))}`;
  const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
  return `${input}.${signature}`;
}
async function dpopProofJwt(headers, options, url, htm, clockSkew2, accessToken) {
  const { privateKey, publicKey, nonce: nonce2 = dpopNonces.get(url.origin) } = options;
  if (!isPrivateKey(privateKey)) {
    throw new TypeError('"DPoP.privateKey" must be a private CryptoKey');
  }
  if (!isPublicKey(publicKey)) {
    throw new TypeError('"DPoP.publicKey" must be a public CryptoKey');
  }
  if (nonce2 !== void 0 && !validateString(nonce2)) {
    throw new TypeError('"DPoP.nonce" must be a non-empty string or undefined');
  }
  if (!publicKey.extractable) {
    throw new TypeError('"DPoP.publicKey.extractable" must be true');
  }
  const now2 = epochTime() + clockSkew2;
  const proof = await jwt({
    alg: keyToJws(privateKey),
    typ: "dpop+jwt",
    jwk: await publicJwk(publicKey)
  }, {
    iat: now2,
    jti: randomBytes(),
    htm,
    nonce: nonce2,
    htu: `${url.origin}${url.pathname}`,
    ath: accessToken ? b64u(await crypto.subtle.digest("SHA-256", buf(accessToken))) : void 0
  }, privateKey);
  headers.set("dpop", proof);
}
var jwkCache;
async function getSetPublicJwkCache(key) {
  const { kty, e: e2, n: n3, x: x2, y: y2, crv } = await crypto.subtle.exportKey("jwk", key);
  const jwk = { kty, e: e2, n: n3, x: x2, y: y2, crv };
  jwkCache.set(key, jwk);
  return jwk;
}
async function publicJwk(key) {
  jwkCache || (jwkCache = /* @__PURE__ */ new WeakMap());
  return jwkCache.get(key) || getSetPublicJwkCache(key);
}
function validateEndpoint(value, endpoint, options) {
  if (typeof value !== "string") {
    if (options?.[useMtlsAlias]) {
      throw new TypeError(`"as.mtls_endpoint_aliases.${endpoint}" must be a string`);
    }
    throw new TypeError(`"as.${endpoint}" must be a string`);
  }
  return new URL(value);
}
function resolveEndpoint(as, endpoint, options) {
  if (options?.[useMtlsAlias] && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
    return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, options);
  }
  return validateEndpoint(as[endpoint], endpoint);
}
function isOAuth2Error(input) {
  const value = input;
  if (typeof value !== "object" || Array.isArray(value) || value === null) {
    return false;
  }
  return value.error !== void 0;
}
function unquote(value) {
  if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1);
  }
  return value;
}
var SPLIT_REGEXP = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/;
var SCHEMES_REGEXP = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function wwwAuth(scheme, params) {
  const arr = params.split(SPLIT_REGEXP).slice(1);
  if (!arr.length) {
    return { scheme: scheme.toLowerCase(), parameters: {} };
  }
  arr[arr.length - 1] = arr[arr.length - 1].replace(/,$/, "");
  const parameters = {};
  for (let i3 = 1; i3 < arr.length; i3 += 2) {
    const idx = i3;
    if (arr[idx][0] === '"') {
      while (arr[idx].slice(-1) !== '"' && ++i3 < arr.length) {
        arr[idx] += arr[i3];
      }
    }
    const key = arr[idx - 1].replace(/^(?:, ?)|=$/g, "").toLowerCase();
    parameters[key] = unquote(arr[idx]);
  }
  return {
    scheme: scheme.toLowerCase(),
    parameters
  };
}
function parseWwwAuthenticateChallenges(response) {
  if (!looseInstanceOf(response, Response)) {
    throw new TypeError('"response" must be an instance of Response');
  }
  const header = response.headers.get("www-authenticate");
  if (header === null) {
    return void 0;
  }
  const result = [];
  for (const { 1: scheme, index } of header.matchAll(SCHEMES_REGEXP)) {
    result.push([scheme, index]);
  }
  if (!result.length) {
    return void 0;
  }
  const challenges = result.map(([scheme, indexOf], i3, others) => {
    const next = others[i3 + 1];
    let parameters;
    if (next) {
      parameters = header.slice(indexOf, next[1]);
    } else {
      parameters = header.slice(indexOf);
    }
    return wwwAuth(scheme, parameters);
  });
  return challenges;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
  if (!validateString(accessToken)) {
    throw new TypeError('"accessToken" must be a non-empty string');
  }
  if (!(url instanceof URL)) {
    throw new TypeError('"url" must be an instance of URL');
  }
  headers = prepareHeaders(headers);
  if (options?.DPoP === void 0) {
    headers.set("authorization", `Bearer ${accessToken}`);
  } else {
    await dpopProofJwt(headers, options.DPoP, url, "GET", getClockSkew({ [clockSkew]: options?.[clockSkew] }), accessToken);
    headers.set("authorization", `DPoP ${accessToken}`);
  }
  return (options?.[customFetch] || fetch)(url.href, {
    body,
    headers: Object.fromEntries(headers.entries()),
    method,
    redirect: "manual",
    signal: options?.signal ? signal(options.signal) : null
  }).then(processDpopNonce);
}
async function userInfoRequest(as, client, accessToken, options) {
  assertAs(as);
  assertClient(client);
  const url = resolveEndpoint(as, "userinfo_endpoint", options);
  const headers = prepareHeaders(options?.headers);
  if (client.userinfo_signed_response_alg) {
    headers.set("accept", "application/jwt");
  } else {
    headers.set("accept", "application/json");
    headers.append("accept", "application/jwt");
  }
  return protectedResourceRequest(accessToken, "GET", url, headers, null, {
    ...options,
    [clockSkew]: getClockSkew(client)
  });
}
var skipSubjectCheck = Symbol();
async function authenticatedRequest(as, client, method, url, body, headers, options) {
  await clientAuthentication(as, client, body, headers, options?.clientPrivateKey);
  headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
  return (options?.[customFetch] || fetch)(url.href, {
    body,
    headers: Object.fromEntries(headers.entries()),
    method,
    redirect: "manual",
    signal: options?.signal ? signal(options.signal) : null
  }).then(processDpopNonce);
}
async function tokenEndpointRequest(as, client, grantType, parameters, options) {
  const url = resolveEndpoint(as, "token_endpoint", options);
  parameters.set("grant_type", grantType);
  const headers = prepareHeaders(options?.headers);
  headers.set("accept", "application/json");
  if (options?.DPoP !== void 0) {
    await dpopProofJwt(headers, options.DPoP, url, "POST", getClockSkew(client));
  }
  return authenticatedRequest(as, client, "POST", url, parameters, headers, options);
}
var idTokenClaims = /* @__PURE__ */ new WeakMap();
function getValidatedIdTokenClaims(ref) {
  if (!ref.id_token) {
    return void 0;
  }
  const claims = idTokenClaims.get(ref);
  if (!claims) {
    throw new TypeError('"ref" was already garbage collected or did not resolve from the proper sources');
  }
  return claims;
}
async function processGenericAccessTokenResponse(as, client, response, ignoreIdToken = false, ignoreRefreshToken = false) {
  assertAs(as);
  assertClient(client);
  if (!looseInstanceOf(response, Response)) {
    throw new TypeError('"response" must be an instance of Response');
  }
  if (response.status !== 200) {
    let err;
    if (err = await handleOAuthBodyError(response)) {
      return err;
    }
    throw new OPE('"response" is not a conform Token Endpoint response');
  }
  assertReadableResponse(response);
  let json;
  try {
    json = await response.json();
  } catch (cause) {
    throw new OPE('failed to parse "response" body as JSON', { cause });
  }
  if (!isJsonObject(json)) {
    throw new OPE('"response" body must be a top level object');
  }
  if (!validateString(json.access_token)) {
    throw new OPE('"response" body "access_token" property must be a non-empty string');
  }
  if (!validateString(json.token_type)) {
    throw new OPE('"response" body "token_type" property must be a non-empty string');
  }
  json.token_type = json.token_type.toLowerCase();
  if (json.token_type !== "dpop" && json.token_type !== "bearer") {
    throw new UnsupportedOperationError("unsupported `token_type` value");
  }
  if (json.expires_in !== void 0 && (typeof json.expires_in !== "number" || json.expires_in <= 0)) {
    throw new OPE('"response" body "expires_in" property must be a positive number');
  }
  if (!ignoreRefreshToken && json.refresh_token !== void 0 && !validateString(json.refresh_token)) {
    throw new OPE('"response" body "refresh_token" property must be a non-empty string');
  }
  if (json.scope !== void 0 && typeof json.scope !== "string") {
    throw new OPE('"response" body "scope" property must be a string');
  }
  if (!ignoreIdToken) {
    if (json.id_token !== void 0 && !validateString(json.id_token)) {
      throw new OPE('"response" body "id_token" property must be a non-empty string');
    }
    if (json.id_token) {
      const { claims } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(void 0, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client)).then(validatePresence.bind(void 0, ["aud", "exp", "iat", "iss", "sub"])).then(validateIssuer.bind(void 0, as.issuer)).then(validateAudience.bind(void 0, client.client_id));
      if (Array.isArray(claims.aud) && claims.aud.length !== 1 && claims.azp !== client.client_id) {
        throw new OPE('unexpected ID Token "azp" (authorized party) claim value');
      }
      if (client.require_auth_time && typeof claims.auth_time !== "number") {
        throw new OPE('unexpected ID Token "auth_time" (authentication time) claim value');
      }
      idTokenClaims.set(json, claims);
    }
  }
  return json;
}
function validateAudience(expected, result) {
  if (Array.isArray(result.claims.aud)) {
    if (!result.claims.aud.includes(expected)) {
      throw new OPE('unexpected JWT "aud" (audience) claim value');
    }
  } else if (result.claims.aud !== expected) {
    throw new OPE('unexpected JWT "aud" (audience) claim value');
  }
  return result;
}
function validateIssuer(expected, result) {
  if (result.claims.iss !== expected) {
    throw new OPE('unexpected JWT "iss" (issuer) claim value');
  }
  return result;
}
var branded = /* @__PURE__ */ new WeakSet();
function brand(searchParams) {
  branded.add(searchParams);
  return searchParams;
}
async function authorizationCodeGrantRequest(as, client, callbackParameters, redirectUri, codeVerifier, options) {
  assertAs(as);
  assertClient(client);
  if (!branded.has(callbackParameters)) {
    throw new TypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()');
  }
  if (!validateString(redirectUri)) {
    throw new TypeError('"redirectUri" must be a non-empty string');
  }
  if (!validateString(codeVerifier)) {
    throw new TypeError('"codeVerifier" must be a non-empty string');
  }
  const code = getURLSearchParameter(callbackParameters, "code");
  if (!code) {
    throw new OPE('no authorization code in "callbackParameters"');
  }
  const parameters = new URLSearchParams(options?.additionalParameters);
  parameters.set("redirect_uri", redirectUri);
  parameters.set("code_verifier", codeVerifier);
  parameters.set("code", code);
  return tokenEndpointRequest(as, client, "authorization_code", parameters, options);
}
var jwtClaimNames = {
  aud: "audience",
  c_hash: "code hash",
  client_id: "client id",
  exp: "expiration time",
  iat: "issued at",
  iss: "issuer",
  jti: "jwt id",
  nonce: "nonce",
  s_hash: "state hash",
  sub: "subject",
  ath: "access token hash",
  htm: "http method",
  htu: "http uri",
  cnf: "confirmation"
};
function validatePresence(required, result) {
  for (const claim of required) {
    if (result.claims[claim] === void 0) {
      throw new OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`);
    }
  }
  return result;
}
var expectNoNonce = Symbol();
var skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge) {
  const result = await processGenericAccessTokenResponse(as, client, response);
  if (isOAuth2Error(result)) {
    return result;
  }
  if (!validateString(result.id_token)) {
    throw new OPE('"response" body "id_token" property must be a non-empty string');
  }
  maxAge ?? (maxAge = client.default_max_age ?? skipAuthTimeCheck);
  const claims = getValidatedIdTokenClaims(result);
  if ((client.require_auth_time || maxAge !== skipAuthTimeCheck) && claims.auth_time === void 0) {
    throw new OPE('ID Token "auth_time" (authentication time) claim missing');
  }
  if (maxAge !== skipAuthTimeCheck) {
    if (typeof maxAge !== "number" || maxAge < 0) {
      throw new TypeError('"options.max_age" must be a non-negative number');
    }
    const now2 = epochTime() + getClockSkew(client);
    const tolerance = getClockTolerance(client);
    if (claims.auth_time + maxAge < now2 - tolerance) {
      throw new OPE("too much time has elapsed since the last End-User authentication");
    }
  }
  switch (expectedNonce) {
    case void 0:
    case expectNoNonce:
      if (claims.nonce !== void 0) {
        throw new OPE('unexpected ID Token "nonce" claim value');
      }
      break;
    default:
      if (!validateString(expectedNonce)) {
        throw new TypeError('"expectedNonce" must be a non-empty string');
      }
      if (claims.nonce === void 0) {
        throw new OPE('ID Token "nonce" claim missing');
      }
      if (claims.nonce !== expectedNonce) {
        throw new OPE('unexpected ID Token "nonce" claim value');
      }
  }
  return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response) {
  const result = await processGenericAccessTokenResponse(as, client, response, true);
  if (isOAuth2Error(result)) {
    return result;
  }
  if (result.id_token !== void 0) {
    if (typeof result.id_token === "string" && result.id_token.length) {
      throw new OPE("Unexpected ID Token returned, use processAuthorizationCodeOpenIDResponse() for OpenID Connect callback processing");
    }
    delete result.id_token;
  }
  return result;
}
function assertReadableResponse(response) {
  if (response.bodyUsed) {
    throw new TypeError('"response" body has been used already');
  }
}
async function handleOAuthBodyError(response) {
  if (response.status > 399 && response.status < 500) {
    assertReadableResponse(response);
    try {
      const json = await response.json();
      if (isJsonObject(json) && typeof json.error === "string" && json.error.length) {
        if (json.error_description !== void 0 && typeof json.error_description !== "string") {
          delete json.error_description;
        }
        if (json.error_uri !== void 0 && typeof json.error_uri !== "string") {
          delete json.error_uri;
        }
        if (json.algs !== void 0 && typeof json.algs !== "string") {
          delete json.algs;
        }
        if (json.scope !== void 0 && typeof json.scope !== "string") {
          delete json.scope;
        }
        return json;
      }
    } catch {
    }
  }
  return void 0;
}
function checkRsaKeyAlgorithm(algorithm) {
  if (typeof algorithm.modulusLength !== "number" || algorithm.modulusLength < 2048) {
    throw new OPE(`${algorithm.name} modulusLength must be at least 2048 bits`);
  }
}
function ecdsaHashName(namedCurve) {
  switch (namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new UnsupportedOperationError();
  }
}
function keyToSubtle(key) {
  switch (key.algorithm.name) {
    case "ECDSA":
      return {
        name: key.algorithm.name,
        hash: ecdsaHashName(key.algorithm.namedCurve)
      };
    case "RSA-PSS": {
      checkRsaKeyAlgorithm(key.algorithm);
      switch (key.algorithm.hash.name) {
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          return {
            name: key.algorithm.name,
            saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3
          };
        default:
          throw new UnsupportedOperationError();
      }
    }
    case "RSASSA-PKCS1-v1_5":
      checkRsaKeyAlgorithm(key.algorithm);
      return key.algorithm.name;
    case "Ed448":
    case "Ed25519":
      return key.algorithm.name;
  }
  throw new UnsupportedOperationError();
}
var noSignatureCheck = Symbol();
async function validateJwt(jws, checkAlg, getKey, clockSkew2, clockTolerance2) {
  const { 0: protectedHeader, 1: payload, 2: encodedSignature, length } = jws.split(".");
  if (length === 5) {
    throw new UnsupportedOperationError("JWE structure JWTs are not supported");
  }
  if (length !== 3) {
    throw new OPE("Invalid JWT");
  }
  let header;
  try {
    header = JSON.parse(buf(b64u(protectedHeader)));
  } catch (cause) {
    throw new OPE("failed to parse JWT Header body as base64url encoded JSON", { cause });
  }
  if (!isJsonObject(header)) {
    throw new OPE("JWT Header must be a top level object");
  }
  checkAlg(header);
  if (header.crit !== void 0) {
    throw new OPE('unexpected JWT "crit" header parameter');
  }
  const signature = b64u(encodedSignature);
  let key;
  if (getKey !== noSignatureCheck) {
    key = await getKey(header);
    const input = `${protectedHeader}.${payload}`;
    const verified = await crypto.subtle.verify(keyToSubtle(key), key, signature, buf(input));
    if (!verified) {
      throw new OPE("JWT signature verification failed");
    }
  }
  let claims;
  try {
    claims = JSON.parse(buf(b64u(payload)));
  } catch (cause) {
    throw new OPE("failed to parse JWT Payload body as base64url encoded JSON", { cause });
  }
  if (!isJsonObject(claims)) {
    throw new OPE("JWT Payload must be a top level object");
  }
  const now2 = epochTime() + clockSkew2;
  if (claims.exp !== void 0) {
    if (typeof claims.exp !== "number") {
      throw new OPE('unexpected JWT "exp" (expiration time) claim type');
    }
    if (claims.exp <= now2 - clockTolerance2) {
      throw new OPE('unexpected JWT "exp" (expiration time) claim value, timestamp is <= now()');
    }
  }
  if (claims.iat !== void 0) {
    if (typeof claims.iat !== "number") {
      throw new OPE('unexpected JWT "iat" (issued at) claim type');
    }
  }
  if (claims.iss !== void 0) {
    if (typeof claims.iss !== "string") {
      throw new OPE('unexpected JWT "iss" (issuer) claim type');
    }
  }
  if (claims.nbf !== void 0) {
    if (typeof claims.nbf !== "number") {
      throw new OPE('unexpected JWT "nbf" (not before) claim type');
    }
    if (claims.nbf > now2 + clockTolerance2) {
      throw new OPE('unexpected JWT "nbf" (not before) claim value, timestamp is > now()');
    }
  }
  if (claims.aud !== void 0) {
    if (typeof claims.aud !== "string" && !Array.isArray(claims.aud)) {
      throw new OPE('unexpected JWT "aud" (audience) claim type');
    }
  }
  return { header, claims, signature, key };
}
function checkSigningAlgorithm(client, issuer, header) {
  if (client !== void 0) {
    if (header.alg !== client) {
      throw new OPE('unexpected JWT "alg" header parameter');
    }
    return;
  }
  if (Array.isArray(issuer)) {
    if (!issuer.includes(header.alg)) {
      throw new OPE('unexpected JWT "alg" header parameter');
    }
    return;
  }
  if (header.alg !== "RS256") {
    throw new OPE('unexpected JWT "alg" header parameter');
  }
}
function getURLSearchParameter(parameters, name) {
  const { 0: value, length } = parameters.getAll(name);
  if (length > 1) {
    throw new OPE(`"${name}" parameter must be provided only once`);
  }
  return value;
}
var skipStateCheck = Symbol();
var expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
  assertAs(as);
  assertClient(client);
  if (parameters instanceof URL) {
    parameters = parameters.searchParams;
  }
  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL');
  }
  if (getURLSearchParameter(parameters, "response")) {
    throw new OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()');
  }
  const iss = getURLSearchParameter(parameters, "iss");
  const state2 = getURLSearchParameter(parameters, "state");
  if (!iss && as.authorization_response_iss_parameter_supported) {
    throw new OPE('response parameter "iss" (issuer) missing');
  }
  if (iss && iss !== as.issuer) {
    throw new OPE('unexpected "iss" (issuer) response parameter value');
  }
  switch (expectedState) {
    case void 0:
    case expectNoState:
      if (state2 !== void 0) {
        throw new OPE('unexpected "state" response parameter encountered');
      }
      break;
    case skipStateCheck:
      break;
    default:
      if (!validateString(expectedState)) {
        throw new OPE('"expectedState" must be a non-empty string');
      }
      if (state2 === void 0) {
        throw new OPE('response parameter "state" missing');
      }
      if (state2 !== expectedState) {
        throw new OPE('unexpected "state" response parameter value');
      }
  }
  const error = getURLSearchParameter(parameters, "error");
  if (error) {
    return {
      error,
      error_description: getURLSearchParameter(parameters, "error_description"),
      error_uri: getURLSearchParameter(parameters, "error_uri")
    };
  }
  const id_token = getURLSearchParameter(parameters, "id_token");
  const token = getURLSearchParameter(parameters, "token");
  if (id_token !== void 0 || token !== void 0) {
    throw new UnsupportedOperationError("implicit and hybrid flows are not supported");
  }
  return brand(new URLSearchParams(parameters));
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/callback/oauth/checks.js
async function signCookie(type, value, maxAge, options, data) {
  const { cookies, logger: logger2 } = options;
  logger2.debug(`CREATE_${type.toUpperCase()}`, { value, maxAge });
  const expires = /* @__PURE__ */ new Date();
  expires.setTime(expires.getTime() + maxAge * 1e3);
  const token = { value };
  if (type === "state" && data)
    token.data = data;
  const name = cookies[type].name;
  return {
    name,
    value: await encode3({ ...options.jwt, maxAge, token, salt: name }),
    options: { ...cookies[type].options, expires }
  };
}
var PKCE_MAX_AGE = 60 * 15;
var pkce = {
  async create(options) {
    const code_verifier = generateRandomCodeVerifier();
    const value = await calculatePKCECodeChallenge(code_verifier);
    const maxAge = PKCE_MAX_AGE;
    const cookie = await signCookie("pkceCodeVerifier", code_verifier, maxAge, options);
    return { cookie, value };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   * @see https://www.rfc-editor.org/rfc/rfc7636
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#pkce
   */
  async use(cookies, resCookies, options) {
    const { provider } = options;
    if (!provider?.checks?.includes("pkce"))
      return;
    const codeVerifier = cookies?.[options.cookies.pkceCodeVerifier.name];
    if (!codeVerifier)
      throw new InvalidCheck("PKCE code_verifier cookie was missing.");
    const value = await decode3({
      ...options.jwt,
      token: codeVerifier,
      salt: options.cookies.pkceCodeVerifier.name
    });
    if (!value?.value)
      throw new InvalidCheck("PKCE code_verifier value could not be parsed.");
    resCookies.push({
      name: options.cookies.pkceCodeVerifier.name,
      value: "",
      options: { ...options.cookies.pkceCodeVerifier.options, maxAge: 0 }
    });
    return value.value;
  }
};
var STATE_MAX_AGE = 60 * 15;
function decodeState(value) {
  try {
    const decoder3 = new TextDecoder();
    return JSON.parse(decoder3.decode(base64url_exports2.decode(value)));
  } catch {
  }
}
var state = {
  async create(options, data) {
    const { provider } = options;
    if (!provider.checks.includes("state")) {
      if (data) {
        throw new InvalidCheck("State data was provided but the provider is not configured to use state.");
      }
      return;
    }
    const encodedState = base64url_exports2.encode(JSON.stringify({ ...data, random: generateRandomState() }));
    const maxAge = STATE_MAX_AGE;
    const cookie = await signCookie("state", encodedState, maxAge, options, data);
    return { cookie, value: encodedState };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-10.12
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
   */
  async use(cookies, resCookies, options, paramRandom) {
    const { provider } = options;
    if (!provider.checks.includes("state"))
      return;
    const state2 = cookies?.[options.cookies.state.name];
    if (!state2)
      throw new InvalidCheck("State cookie was missing.");
    const encodedState = await decode3({
      ...options.jwt,
      token: state2,
      salt: options.cookies.state.name
    });
    if (!encodedState?.value)
      throw new InvalidCheck("State (cookie) value could not be parsed.");
    const decodedState = decodeState(encodedState.value);
    if (!decodedState)
      throw new InvalidCheck("State (encoded) value could not be parsed.");
    if (decodedState.random !== paramRandom)
      throw new InvalidCheck(`Random state values did not match. Expected: ${decodedState.random}. Got: ${paramRandom}`);
    resCookies.push({
      name: options.cookies.state.name,
      value: "",
      options: { ...options.cookies.state.options, maxAge: 0 }
    });
    return encodedState.value;
  }
};
var NONCE_MAX_AGE = 60 * 15;
var nonce = {
  async create(options) {
    if (!options.provider.checks.includes("nonce"))
      return;
    const value = generateRandomNonce();
    const maxAge = NONCE_MAX_AGE;
    const cookie = await signCookie("nonce", value, maxAge, options);
    return { cookie, value };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  async use(cookies, resCookies, options) {
    const { provider } = options;
    if (!provider?.checks?.includes("nonce"))
      return;
    const nonce2 = cookies?.[options.cookies.nonce.name];
    if (!nonce2)
      throw new InvalidCheck("Nonce cookie was missing.");
    const value = await decode3({
      ...options.jwt,
      token: nonce2,
      salt: options.cookies.nonce.name
    });
    if (!value?.value)
      throw new InvalidCheck("Nonce value could not be parsed.");
    resCookies.push({
      name: options.cookies.nonce.name,
      value: "",
      options: { ...options.cookies.nonce.options, maxAge: 0 }
    });
    return value.value;
  }
};
function handleState(query, provider, isOnRedirectProxy) {
  let randomState;
  let proxyRedirect;
  if (provider.redirectProxyUrl && !query?.state) {
    throw new InvalidCheck("Missing state in query, but required for redirect proxy");
  }
  const state2 = decodeState(query?.state);
  randomState = state2?.random;
  if (isOnRedirectProxy) {
    if (!state2?.origin)
      return { randomState };
    proxyRedirect = `${state2.origin}?${new URLSearchParams(query)}`;
  }
  return { randomState, proxyRedirect };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/callback/oauth/callback.js
async function handleOAuth(query, cookies, options, randomState) {
  const { logger: logger2, provider } = options;
  let as;
  const { token, userinfo } = provider;
  if ((!token?.url || token.url.host === "authjs.dev") && (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
    const issuer = new URL(provider.issuer);
    const discoveryResponse = await discoveryRequest(issuer);
    const discoveredAs = await processDiscoveryResponse(issuer, discoveryResponse);
    if (!discoveredAs.token_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
    if (!discoveredAs.userinfo_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
    as = discoveredAs;
  } else {
    as = {
      issuer: provider.issuer ?? "https://authjs.dev",
      token_endpoint: token?.url.toString(),
      userinfo_endpoint: userinfo?.url.toString()
    };
  }
  const client = {
    client_id: provider.clientId,
    client_secret: provider.clientSecret,
    ...provider.client
  };
  const resCookies = [];
  const state2 = await state.use(cookies, resCookies, options, randomState);
  const codeGrantParams = validateAuthResponse(as, client, new URLSearchParams(query), provider.checks.includes("state") ? state2 : skipStateCheck);
  if (isOAuth2Error(codeGrantParams)) {
    const cause = { providerId: provider.id, ...codeGrantParams };
    logger2.debug("OAuthCallbackError", cause);
    throw new OAuthCallbackError("OAuth Provider returned an error", cause);
  }
  const codeVerifier = await pkce.use(cookies, resCookies, options);
  let redirect_uri = provider.callbackUrl;
  if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    redirect_uri = provider.redirectProxyUrl;
  }
  let codeGrantResponse = await authorizationCodeGrantRequest(
    as,
    client,
    codeGrantParams,
    redirect_uri,
    codeVerifier ?? "auth"
    // TODO: review fallback code verifier
  );
  if (provider.token?.conform) {
    codeGrantResponse = await provider.token.conform(codeGrantResponse.clone()) ?? codeGrantResponse;
  }
  let challenges;
  if (challenges = parseWwwAuthenticateChallenges(codeGrantResponse)) {
    for (const challenge of challenges) {
      console.log("challenge", challenge);
    }
    throw new Error("TODO: Handle www-authenticate challenges as needed");
  }
  let profile = {};
  let tokens;
  if (provider.type === "oidc") {
    const nonce2 = await nonce.use(cookies, resCookies, options);
    const result = await processAuthorizationCodeOpenIDResponse(as, client, codeGrantResponse, nonce2 ?? expectNoNonce);
    if (isOAuth2Error(result)) {
      console.log("error", result);
      throw new Error("TODO: Handle OIDC response body error");
    }
    profile = getValidatedIdTokenClaims(result);
    tokens = result;
  } else {
    tokens = await processAuthorizationCodeOAuth2Response(as, client, codeGrantResponse);
    if (isOAuth2Error(tokens)) {
      console.log("error", tokens);
      throw new Error("TODO: Handle OAuth 2.0 response body error");
    }
    if (userinfo?.request) {
      const _profile = await userinfo.request({ tokens, provider });
      if (_profile instanceof Object)
        profile = _profile;
    } else if (userinfo?.url) {
      const userinfoResponse = await userInfoRequest(as, client, tokens.access_token);
      profile = await userinfoResponse.json();
    } else {
      throw new TypeError("No userinfo endpoint configured");
    }
  }
  if (tokens.expires_in) {
    tokens.expires_at = Math.floor(Date.now() / 1e3) + Number(tokens.expires_in);
  }
  const profileResult = await getUserAndAccount(profile, provider, tokens, logger2);
  return { ...profileResult, profile, cookies: resCookies };
}
async function getUserAndAccount(OAuthProfile, provider, tokens, logger2) {
  try {
    const user = await provider.profile(OAuthProfile, tokens);
    user.email = user.email?.toLowerCase();
    if (!user.id) {
      throw new TypeError(`User id is missing in ${provider.name} OAuth profile response`);
    }
    return {
      user,
      account: {
        ...tokens,
        provider: provider.id,
        type: provider.type,
        providerAccountId: user.id.toString()
      }
    };
  } catch (e2) {
    logger2.debug("getProfile error details", OAuthProfile);
    logger2.error(new OAuthProfileParseError(e2, { provider: provider.id }));
  }
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/callback/index.js
async function callback(request, options, sessionStore, cookies) {
  if (!options.provider)
    throw new InvalidProvider("Callback route called without provider");
  const { query, body, method, headers } = request;
  const { provider, adapter, url, callbackUrl, pages, jwt: jwt2, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger: logger2 } = options;
  const useJwtSession = sessionStrategy === "jwt";
  try {
    if (provider.type === "oauth" || provider.type === "oidc") {
      const { proxyRedirect, randomState } = handleState(query, provider, options.isOnRedirectProxy);
      if (proxyRedirect) {
        logger2.debug("proxy redirect", { proxyRedirect, randomState });
        return { redirect: proxyRedirect };
      }
      const authorizationResult = await handleOAuth(query, request.cookies, options, randomState);
      if (authorizationResult.cookies.length) {
        cookies.push(...authorizationResult.cookies);
      }
      logger2.debug("authorization result", authorizationResult);
      const { user: userFromProvider, account, profile: OAuthProfile } = authorizationResult;
      if (!userFromProvider || !account || !OAuthProfile) {
        return { redirect: `${url}/signin`, cookies };
      }
      let userByAccount;
      if (adapter) {
        const { getUserByAccount } = adapter;
        userByAccount = await getUserByAccount({
          providerAccountId: account.providerAccountId,
          provider: provider.id
        });
      }
      await handleAuthorized({
        user: userByAccount ?? userFromProvider,
        account,
        profile: OAuthProfile
      }, options.callbacks.signIn);
      const { user, session: session2, isNewUser } = await handleLoginOrRegister(sessionStore.value, userFromProvider, account, options);
      if (useJwtSession) {
        const defaultToken = {
          name: user.name,
          email: user.email,
          picture: user.image,
          sub: user.id?.toString()
        };
        const token = await callbacks.jwt({
          token: defaultToken,
          user,
          account,
          profile: OAuthProfile,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        if (token === null) {
          cookies.push(...sessionStore.clean());
        } else {
          const salt = options.cookies.sessionToken.name;
          const newToken = await jwt2.encode({ ...jwt2, token, salt });
          const cookieExpires = /* @__PURE__ */ new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        }
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session2.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session2.expires
          }
        });
      }
      await events.signIn?.({ user, account, profile: OAuthProfile, isNewUser });
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
          cookies
        };
      }
      return { redirect: callbackUrl, cookies };
    } else if (provider.type === "email") {
      const token = query?.token;
      const identifier = query?.email;
      if (!token || !identifier) {
        const e2 = new TypeError("Missing token or email. The sign-in URL was manually opened without token/identifier or the link was not sent correctly in the email.", { cause: { hasToken: !!token, hasEmail: !!identifier } });
        e2.name = "Configuration";
        throw e2;
      }
      const secret = provider.secret ?? options.secret;
      const invite = await adapter.useVerificationToken({
        identifier,
        token: await createHash(`${token}${secret}`)
      });
      const hasInvite = !!invite;
      const expired = invite ? invite.expires.valueOf() < Date.now() : void 0;
      const invalidInvite = !hasInvite || expired;
      if (invalidInvite)
        throw new Verification({ hasInvite, expired });
      const user = await adapter.getUserByEmail(identifier) ?? {
        id: identifier,
        email: identifier,
        emailVerified: null
      };
      const account = {
        providerAccountId: user.email,
        userId: user.id,
        type: "email",
        provider: provider.id
      };
      await handleAuthorized({ user, account }, options.callbacks.signIn);
      const { user: loggedInUser, session: session2, isNewUser } = await handleLoginOrRegister(sessionStore.value, user, account, options);
      if (useJwtSession) {
        const defaultToken = {
          name: loggedInUser.name,
          email: loggedInUser.email,
          picture: loggedInUser.image,
          sub: loggedInUser.id?.toString()
        };
        const token2 = await callbacks.jwt({
          token: defaultToken,
          user: loggedInUser,
          account,
          isNewUser,
          trigger: isNewUser ? "signUp" : "signIn"
        });
        if (token2 === null) {
          cookies.push(...sessionStore.clean());
        } else {
          const salt = options.cookies.sessionToken.name;
          const newToken = await jwt2.encode({ ...jwt2, token: token2, salt });
          const cookieExpires = /* @__PURE__ */ new Date();
          cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
          const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
          });
          cookies.push(...sessionCookies);
        }
      } else {
        cookies.push({
          name: options.cookies.sessionToken.name,
          value: session2.sessionToken,
          options: {
            ...options.cookies.sessionToken.options,
            expires: session2.expires
          }
        });
      }
      await events.signIn?.({ user: loggedInUser, account, isNewUser });
      if (isNewUser && pages.newUser) {
        return {
          redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({ callbackUrl })}`,
          cookies
        };
      }
      return { redirect: callbackUrl, cookies };
    } else if (provider.type === "credentials" && method === "POST") {
      const credentials = body ?? {};
      Object.entries(query ?? {}).forEach(([k3, v3]) => url.searchParams.set(k3, v3));
      const user = await provider.authorize(
        credentials,
        // prettier-ignore
        new Request(url, { headers, method, body: JSON.stringify(body) })
      );
      if (!user)
        throw new CredentialsSignin();
      const account = {
        providerAccountId: user.id,
        type: "credentials",
        provider: provider.id
      };
      await handleAuthorized({ user, account, credentials }, options.callbacks.signIn);
      const defaultToken = {
        name: user.name,
        email: user.email,
        picture: user.image,
        sub: user.id?.toString()
      };
      const token = await callbacks.jwt({
        token: defaultToken,
        user,
        account,
        isNewUser: false,
        trigger: "signIn"
      });
      if (token === null) {
        cookies.push(...sessionStore.clean());
      } else {
        const salt = options.cookies.sessionToken.name;
        const newToken = await jwt2.encode({ ...jwt2, token, salt });
        const cookieExpires = /* @__PURE__ */ new Date();
        cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1e3);
        const sessionCookies = sessionStore.chunk(newToken, {
          expires: cookieExpires
        });
        cookies.push(...sessionCookies);
      }
      await events.signIn?.({ user, account });
      return { redirect: callbackUrl, cookies };
    }
    throw new InvalidProvider(`Callback for provider type (${provider.type}) is not supported`);
  } catch (e2) {
    if (e2 instanceof AuthError)
      throw e2;
    const error = new CallbackRouteError(e2, { provider: provider.id });
    logger2.debug("callback route error details", { method, query, body });
    throw error;
  }
}
async function handleAuthorized(params, signIn2) {
  try {
    const authorized = await signIn2(params);
    if (!authorized)
      throw new AuthorizedCallbackError("AccessDenied");
  } catch (e2) {
    if (e2 instanceof AuthError)
      throw e2;
    throw new AuthorizedCallbackError(e2);
  }
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/session.js
async function session(options, sessionStore, cookies, isUpdate, newSession) {
  const { adapter, jwt: jwt2, events, callbacks, logger: logger2, session: { strategy: sessionStrategy, maxAge: sessionMaxAge } } = options;
  const response = {
    body: null,
    headers: { "Content-Type": "application/json" },
    cookies
  };
  const sessionToken = sessionStore.value;
  if (!sessionToken)
    return response;
  if (sessionStrategy === "jwt") {
    try {
      const salt = options.cookies.sessionToken.name;
      const payload = await jwt2.decode({ ...jwt2, token: sessionToken, salt });
      if (!payload)
        throw new Error("Invalid JWT");
      const token = await callbacks.jwt({
        token: payload,
        ...isUpdate && { trigger: "update" },
        session: newSession
      });
      const newExpires = fromDate(sessionMaxAge);
      if (token !== null) {
        const session2 = {
          user: { name: token.name, email: token.email, image: token.picture },
          expires: newExpires.toISOString()
        };
        const newSession2 = await callbacks.session({ session: session2, token });
        response.body = newSession2;
        const newToken = await jwt2.encode({ ...jwt2, token, salt });
        const sessionCookies = sessionStore.chunk(newToken, {
          expires: newExpires
        });
        response.cookies?.push(...sessionCookies);
        await events.session?.({ session: newSession2, token });
      } else {
        response.cookies?.push(...sessionStore.clean());
      }
    } catch (e2) {
      logger2.error(new JWTSessionError(e2));
      response.cookies?.push(...sessionStore.clean());
    }
    return response;
  }
  try {
    const { getSessionAndUser, deleteSession, updateSession } = adapter;
    let userAndSession = await getSessionAndUser(sessionToken);
    if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
      await deleteSession(sessionToken);
      userAndSession = null;
    }
    if (userAndSession) {
      const { user, session: session2 } = userAndSession;
      const sessionUpdateAge = options.session.updateAge;
      const sessionIsDueToBeUpdatedDate = session2.expires.valueOf() - sessionMaxAge * 1e3 + sessionUpdateAge * 1e3;
      const newExpires = fromDate(sessionMaxAge);
      if (sessionIsDueToBeUpdatedDate <= Date.now()) {
        await updateSession({
          sessionToken,
          expires: newExpires
        });
      }
      const sessionPayload = await callbacks.session({
        // By default, only exposes a limited subset of information to the client
        // as needed for presentation purposes (e.g. "you are logged in as...").
        session: {
          // @ts-expect-error missing `id`.
          user: { name: user.name, email: user.email, image: user.image },
          expires: session2.expires.toISOString()
        },
        user,
        newSession,
        ...isUpdate ? { trigger: "update" } : {}
      });
      response.body = sessionPayload;
      response.cookies?.push({
        name: options.cookies.sessionToken.name,
        value: sessionToken,
        options: {
          ...options.cookies.sessionToken.options,
          expires: newExpires
        }
      });
      await events.session?.({ session: sessionPayload });
    } else if (sessionToken) {
      response.cookies?.push(...sessionStore.clean());
    }
  } catch (e2) {
    logger2.error(new SessionTokenError(e2));
  }
  return response;
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/signin/authorization-url.js
async function getAuthorizationUrl(query, options) {
  const { logger: logger2, provider } = options;
  let url = provider.authorization?.url;
  let as;
  if (!url || url.host === "authjs.dev") {
    const issuer = new URL(provider.issuer);
    const discoveryResponse = await discoveryRequest(issuer);
    const as2 = await processDiscoveryResponse(issuer, discoveryResponse);
    if (!as2.authorization_endpoint) {
      throw new TypeError("Authorization server did not provide an authorization endpoint.");
    }
    url = new URL(as2.authorization_endpoint);
  }
  const authParams = url.searchParams;
  let redirect_uri = provider.callbackUrl;
  let data;
  if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    redirect_uri = provider.redirectProxyUrl;
    data = { origin: provider.callbackUrl };
    logger2.debug("using redirect proxy", { redirect_uri, data });
  }
  const params = Object.assign({
    response_type: "code",
    // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
    client_id: provider.clientId,
    redirect_uri,
    // @ts-expect-error TODO:
    ...provider.authorization?.params
  }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
  for (const k3 in params)
    authParams.set(k3, params[k3]);
  const cookies = [];
  const state2 = await state.create(options, data);
  if (state2) {
    authParams.set("state", state2.value);
    cookies.push(state2.cookie);
  }
  if (provider.checks?.includes("pkce")) {
    if (as && !as.code_challenge_methods_supported?.includes("S256")) {
      if (provider.type === "oidc")
        provider.checks = ["nonce"];
    } else {
      const { value, cookie } = await pkce.create(options);
      authParams.set("code_challenge", value);
      authParams.set("code_challenge_method", "S256");
      cookies.push(cookie);
    }
  }
  const nonce2 = await nonce.create(options);
  if (nonce2) {
    authParams.set("nonce", nonce2.value);
    cookies.push(nonce2.cookie);
  }
  if (provider.type === "oidc" && !url.searchParams.has("scope")) {
    url.searchParams.set("scope", "openid profile email");
  }
  logger2.debug("authorization url is ready", { url, cookies, provider });
  return { redirect: url.toString(), cookies };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/signin/send-token.js
async function sendToken(request, options) {
  const { body } = request;
  const { provider, url, callbacks, adapter } = options;
  const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
  const email = normalizer(body?.email);
  const defaultUser = { id: email, email, emailVerified: null };
  const user = await adapter.getUserByEmail(email) ?? defaultUser;
  const account = {
    providerAccountId: email,
    userId: user.id,
    type: "email",
    provider: provider.id
  };
  let authorized;
  try {
    const params = { user, account, email: { verificationRequest: true } };
    authorized = await callbacks.signIn(params);
  } catch (e2) {
    throw new AuthorizedCallbackError(e2);
  }
  if (!authorized)
    throw new AuthorizedCallbackError("AccessDenied");
  const { callbackUrl, theme } = options;
  const token = await provider.generateVerificationToken?.() ?? randomString(32);
  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1e3);
  const secret = provider.secret ?? options.secret;
  const sendRequest = provider.sendVerificationRequest({
    identifier: email,
    token,
    expires,
    url: `${url}/callback/${provider.id}?${new URLSearchParams({
      callbackUrl,
      token,
      email
    })}`,
    provider,
    theme,
    request: toRequest(request)
  });
  const createToken = adapter.createVerificationToken?.({
    identifier: email,
    token: await createHash(`${token}${secret}`),
    expires
  });
  await Promise.all([sendRequest, createToken]);
  return {
    redirect: `${url}/verify-request?${new URLSearchParams({
      provider: provider.id,
      type: provider.type
    })}`
  };
}
function defaultNormalizer(email) {
  if (!email)
    throw new Error("Missing email from request body.");
  let [local, domain] = email.toLowerCase().trim().split("@");
  domain = domain.split(",")[0];
  return `${local}@${domain}`;
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/signin/index.js
async function signIn(request, cookies, options) {
  const signInUrl = `${options.url}/signin`;
  if (!options.provider)
    return { redirect: signInUrl, cookies };
  switch (options.provider.type) {
    case "oauth":
    case "oidc": {
      const { redirect, cookies: authCookies } = await getAuthorizationUrl(request.query, options);
      if (authCookies)
        cookies.push(...authCookies);
      return { redirect, cookies };
    }
    case "email": {
      return await sendToken(request, options);
    }
    default:
      return { redirect: signInUrl, cookies };
  }
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/actions/signout.js
async function signOut(cookies, sessionStore, options) {
  const { jwt: jwt2, events, callbackUrl: redirect, logger: logger2, session: session2 } = options;
  const sessionToken = sessionStore.value;
  if (!sessionToken)
    return { redirect, cookies };
  try {
    if (session2.strategy === "jwt") {
      const salt = options.cookies.sessionToken.name;
      const token = await jwt2.decode({ ...jwt2, token: sessionToken, salt });
      await events.signOut?.({ token });
    } else {
      const session3 = await options.adapter?.deleteSession(sessionToken);
      await events.signOut?.({ session: session3 });
    }
  } catch (e2) {
    logger2.error(new SignOutError(e2));
  }
  cookies.push(...sessionStore.clean());
  return { redirect, cookies };
}

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/lib/index.js
async function AuthInternal(request, authOptions) {
  const { action, providerId, error, method } = request;
  const csrfDisabled = authOptions.skipCSRFCheck === skipCSRFCheck;
  const { options, cookies } = await init({
    authOptions,
    action,
    providerId,
    url: request.url,
    callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
    csrfToken: request.body?.csrfToken,
    cookies: request.cookies,
    isPost: method === "POST",
    csrfDisabled
  });
  const sessionStore = new SessionStore(options.cookies.sessionToken, request.cookies, options.logger);
  if (method === "GET") {
    const render = renderPage({ ...options, query: request.query, cookies });
    switch (action) {
      case "callback":
        return await callback(request, options, sessionStore, cookies);
      case "csrf":
        return render.csrf(csrfDisabled, options, cookies);
      case "error":
        return render.error(error);
      case "providers":
        return render.providers(options.providers);
      case "session":
        return await session(options, sessionStore, cookies);
      case "signin":
        return render.signin(error);
      case "signout":
        return render.signout();
      case "verify-request":
        return render.verifyRequest();
      default:
    }
  } else {
    const { csrfTokenVerified } = options;
    switch (action) {
      case "callback":
        if (options.provider.type === "credentials")
          validateCSRF(action, csrfTokenVerified);
        return await callback(request, options, sessionStore, cookies);
      case "session":
        validateCSRF(action, csrfTokenVerified);
        return await session(options, sessionStore, cookies, true, request.body?.data);
      case "signin":
        validateCSRF(action, csrfTokenVerified);
        return await signIn(request, cookies, options);
      case "signout":
        validateCSRF(action, csrfTokenVerified);
        return await signOut(cookies, sessionStore, options);
      default:
    }
  }
  throw new UnknownAction(`Cannot handle action: ${action}`);
}
var skipCSRFCheck = Symbol("skip-csrf-check");
var raw = Symbol("return-type-raw");

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/index.js
async function Auth(request, config) {
  setLogger(config.logger, config.debug);
  const internalRequest = await toInternalRequest(request);
  if (internalRequest instanceof Error) {
    logger.error(internalRequest);
    return Response.json(`Error: This action with HTTP ${request.method} is not supported.`, { status: 400 });
  }
  const assertionResult = assertConfig(internalRequest, config);
  if (Array.isArray(assertionResult)) {
    assertionResult.forEach(logger.warn);
  } else if (assertionResult instanceof Error) {
    logger.error(assertionResult);
    const htmlPages = ["signin", "signout", "error", "verify-request"];
    if (!htmlPages.includes(internalRequest.action) || internalRequest.method !== "GET") {
      return new Response(JSON.stringify({
        message: "There was a problem with the server configuration. Check the server logs for more information.",
        code: assertionResult.name
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
    const { pages, theme } = config;
    const authOnErrorPage = pages?.error && internalRequest.url.searchParams.get("callbackUrl")?.startsWith(pages.error);
    if (!pages?.error || authOnErrorPage) {
      if (authOnErrorPage) {
        logger.error(new ErrorPageLoop(`The error page ${pages?.error} should not require authentication`));
      }
      const render = renderPage({ theme });
      const page = render.error("Configuration");
      return toResponse(page);
    }
    return Response.redirect(`${pages.error}?error=Configuration`);
  }
  const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
  const isRaw = config.raw === raw;
  let response;
  try {
    const rawResponse = await AuthInternal(internalRequest, config);
    if (isRaw)
      return rawResponse;
    response = await toResponse(rawResponse);
  } catch (e2) {
    const error = e2;
    logger.error(error);
    const isAuthError = error instanceof AuthError;
    if (isAuthError && isRaw && !isRedirect)
      throw error;
    if (request.method === "POST" && internalRequest.action === "session")
      return Response.json(null, { status: 400 });
    const type = isAuthError ? error.type : "Configuration";
    const page = isAuthError && error.kind || "error";
    const params = new URLSearchParams({ error: type });
    const path = config.pages?.[page] ?? `${internalRequest.url.pathname}/${page.toLowerCase()}`;
    const url = `${internalRequest.url.origin}${path}?${params}`;
    if (isRedirect)
      return Response.json({ url });
    return Response.redirect(url);
  }
  const redirect = response.headers.get("Location");
  if (!isRedirect || !redirect)
    return response;
  return Response.json({ url: redirect }, { headers: response.headers });
}

// node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k3) => typeof obj[obj[k3]] !== "number");
    const filtered = {};
    for (const k3 of validKeys) {
      filtered[k3] = obj[k3];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e2) {
      return obj[e2];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_4, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i3 = 0;
          while (i3 < issue.path.length) {
            const el = issue.path[i3];
            const terminal = i3 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i3++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m3) => !!m3).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x2) => !!x2)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s3 of results) {
      if (s3.status === "aborted")
        return INVALID;
      if (s3.status === "dirty")
        status.dirty();
      arrayValue.push(s3.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x2) => x2.status === "aborted";
var isDirty = (x2) => x2.status === "dirty";
var isValid = (x2) => x2.status === "valid";
var isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2 === null || message2 === void 0 ? void 0 : message2.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a9;
    const ctx = {
      common: {
        issues: [],
        async: (_a9 = params === null || params === void 0 ? void 0 : params.async) !== null && _a9 !== void 0 ? _a9 : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message2) {
    const getIssueProperties = (val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[a-z][a-z0-9]*$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
        //
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a9) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a9;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a9 = options === null || options === void 0 ? void 0 : options.offset) !== null && _a9 !== void 0 ? _a9 : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a9;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a9 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a9 !== void 0 ? _a9 : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a9;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a9 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a9 !== void 0 ? _a9 : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i3) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i3) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a9, _b, _c, _d;
          const defaultError = (_c = (_b = (_a9 = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a9, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message2).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types2, params) => {
  return new ZodUnion({
    options: types2,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return Object.keys(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a3, b3) {
  const aType = getParsedType(a3);
  const bType = getParsedType(b3);
  if (a3 === b3) {
    return { valid: true, data: a3 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b3);
    const sharedKeys = util.objectKeys(a3).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a3, ...b3 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a3[key], b3[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a3.length !== b3.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a3.length; index++) {
      const itemA = a3[index];
      const itemB = b3[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a3 === +b3) {
    return { valid: true, data: a3 };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x2) => !!x2);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i3) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i3)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e2) => {
          error.addIssue(makeArgsIssue(args, e2));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e2) => {
          error.addIssue(makeReturnsIssue(result, e2));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return _ZodEnum.create(values);
  }
  exclude(values) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.issues.length) {
        return {
          status: "dirty",
          value: ctx.data
        };
      }
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a3, b3) {
    return new _ZodPipeline({
      in: a3,
      out: b3,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    if (isValid(result)) {
      result.value = Object.freeze(result.value);
    }
    return result;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a9, _b;
      if (!check(data)) {
        const p3 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a9 = p3.fatal) !== null && _a9 !== void 0 ? _a9 : fatal) !== null && _b !== void 0 ? _b : true;
        const p22 = typeof p3 === "string" ? { message: p3 } : p3;
        ctx.addIssue({ code: "custom", ...p22, fatal: _fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// node_modules/.pnpm/@t3-oss+env-core@0.9.2_typescript@5.3.3_zod@3.22.4/node_modules/@t3-oss/env-core/dist/index.js
function createEnv(opts) {
  const runtimeEnv = opts.runtimeEnvStrict ?? opts.runtimeEnv ?? process.env;
  const emptyStringAsUndefined = opts.emptyStringAsUndefined ?? false;
  if (emptyStringAsUndefined) {
    for (const [key, value] of Object.entries(runtimeEnv)) {
      if (value === "") {
        delete runtimeEnv[key];
      }
    }
  }
  const skip = !!opts.skipValidation;
  if (skip)
    return runtimeEnv;
  const _client = typeof opts.client === "object" ? opts.client : {};
  const _server = typeof opts.server === "object" ? opts.server : {};
  const _shared = typeof opts.shared === "object" ? opts.shared : {};
  const client = z2.object(_client);
  const server = z2.object(_server);
  const shared = z2.object(_shared);
  const isServer2 = opts.isServer ?? typeof window === "undefined";
  const allClient = client.merge(shared);
  const allServer = server.merge(shared).merge(client);
  const parsed = isServer2 ? allServer.safeParse(runtimeEnv) : allClient.safeParse(runtimeEnv);
  const onValidationError = opts.onValidationError ?? ((error) => {
    console.error("\u274C Invalid environment variables:", error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  });
  const onInvalidAccess = opts.onInvalidAccess ?? ((_variable) => {
    throw new Error("\u274C Attempted to access a server-side environment variable on the client");
  });
  if (parsed.success === false) {
    return onValidationError(parsed.error);
  }
  const isServerAccess = (prop) => {
    if (!opts.clientPrefix)
      return true;
    return !prop.startsWith(opts.clientPrefix) && !(prop in shared.shape);
  };
  const isValidServerAccess = (prop) => {
    return isServer2 || !isServerAccess(prop);
  };
  const ignoreProp = (prop) => {
    return prop === "__esModule" || prop === "$$typeof";
  };
  const extendedObj = (opts.extends ?? []).reduce((acc, curr) => {
    return Object.assign(acc, curr);
  }, {});
  const fullObj = Object.assign(parsed.data, extendedObj);
  const env2 = new Proxy(fullObj, {
    get(target, prop) {
      if (typeof prop !== "string")
        return void 0;
      if (ignoreProp(prop))
        return void 0;
      if (!isValidServerAccess(prop))
        return onInvalidAccess(prop);
      return Reflect.get(target, prop);
    }
  });
  return env2;
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in window;
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_4, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a3, b3) {
  if (a3 === b3) {
    return true;
  }
  if (typeof a3 !== typeof b3) {
    return false;
  }
  if (a3 && b3 && typeof a3 === "object" && typeof b3 === "object") {
    return !Object.keys(b3).some((key) => !partialMatchKey(a3[key], b3[key]));
  }
  return false;
}
function replaceEqualDeep(a3, b3) {
  if (a3 === b3) {
    return a3;
  }
  const array = isPlainArray(a3) && isPlainArray(b3);
  if (array || isPlainObject(a3) && isPlainObject(b3)) {
    const aItems = array ? a3 : Object.keys(a3);
    const aSize = aItems.length;
    const bItems = array ? b3 : Object.keys(b3);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i3 = 0; i3 < bSize; i3++) {
      const key = array ? i3 : bItems[i3];
      if (!array && a3[key] === void 0 && b3[key] === void 0 && aItems.includes(key)) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a3[key], b3[key]);
        if (copy[key] === a3[key] && a3[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a3 : copy;
  }
  return b3;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o4) {
  if (!hasObjectPrototype(o4)) {
    return false;
  }
  const ctor = o4.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o4) {
  return Object.prototype.toString.call(o4) === "[object Object]";
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/focusManager.js
var _focused, _cleanup, _setup, _a;
var FocusManager = (_a = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _focused, void 0);
    __privateAdd(this, _cleanup, void 0);
    __privateAdd(this, _setup, void 0);
    __privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup)) {
      this.setEventListener(__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a9;
    if (!this.hasListeners()) {
      (_a9 = __privateGet(this, _cleanup)) == null ? void 0 : _a9.call(this);
      __privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a9;
    __privateSet(this, _setup, setup);
    (_a9 = __privateGet(this, _cleanup)) == null ? void 0 : _a9.call(this);
    __privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = __privateGet(this, _focused) !== focused;
    if (changed) {
      __privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof __privateGet(this, _focused) === "boolean") {
      return __privateGet(this, _focused);
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a);
var focusManager = new FocusManager();

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/onlineManager.js
var _online, _cleanup2, _setup2, _a2;
var OnlineManager = (_a2 = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _online, true);
    __privateAdd(this, _cleanup2, void 0);
    __privateAdd(this, _setup2, void 0);
    __privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup2)) {
      this.setEventListener(__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a9;
    if (!this.hasListeners()) {
      (_a9 = __privateGet(this, _cleanup2)) == null ? void 0 : _a9.call(this);
      __privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a9;
    __privateSet(this, _setup2, setup);
    (_a9 = __privateGet(this, _cleanup2)) == null ? void 0 : _a9.call(this);
    __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = __privateGet(this, _online) !== online;
    if (changed) {
      __privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return __privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _a2);
var onlineManager = new OnlineManager();

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class {
  constructor(options) {
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const shouldPause = () => !focusManager.isFocused() || config.networkMode !== "always" && !onlineManager.isOnline();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        const canContinue = isResolved || !shouldPause();
        if (canContinue) {
          continueResolve(value);
        }
        return canContinue;
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        if (shouldPause()) {
          return pause();
        }
        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  if (canFetch(config.networkMode)) {
    run();
  } else {
    pause().then(run);
  }
  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn?.();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/notifyManager.js
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback2) => {
    callback2();
  };
  let batchNotifyFn = (callback2) => {
    callback2();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const setScheduler = (fn) => {
    scheduleFn = fn;
  };
  const batch = (callback2) => {
    let result;
    transactions++;
    try {
      result = callback2();
    } finally {
      transactions--;
      if (!transactions) {
        flush();
      }
    }
    return result;
  };
  const schedule = (callback2) => {
    if (transactions) {
      queue.push(callback2);
    } else {
      scheduleFn(() => {
        notifyFn(callback2);
      });
    }
  };
  const batchCalls = (callback2) => {
    return (...args) => {
      schedule(() => {
        callback2(...args);
      });
    };
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback2) => {
            notifyFn(callback2);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn) => {
    notifyFn = fn;
  };
  const setBatchNotifyFunction = (fn) => {
    batchNotifyFn = fn;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction,
    setScheduler
  };
}
var notifyManager = createNotifyManager();

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/removable.js
var _gcTimeout, _a3;
var Removable = (_a3 = class {
  constructor() {
    __privateAdd(this, _gcTimeout, void 0);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
}, _gcTimeout = new WeakMap(), _a3);

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/query.js
var _initialState, _revertState, _cache, _promise, _retryer, _observers, _defaultOptions, _abortSignalConsumed, _setOptions, setOptions_fn, _dispatch, dispatch_fn, _a4;
var Query = (_a4 = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _setOptions);
    __privateAdd(this, _dispatch);
    __privateAdd(this, _initialState, void 0);
    __privateAdd(this, _revertState, void 0);
    __privateAdd(this, _cache, void 0);
    __privateAdd(this, _promise, void 0);
    __privateAdd(this, _retryer, void 0);
    __privateAdd(this, _observers, void 0);
    __privateAdd(this, _defaultOptions, void 0);
    __privateAdd(this, _abortSignalConsumed, void 0);
    __privateSet(this, _abortSignalConsumed, false);
    __privateSet(this, _defaultOptions, config.defaultOptions);
    __privateMethod(this, _setOptions, setOptions_fn).call(this, config.options);
    __privateSet(this, _observers, []);
    __privateSet(this, _cache, config.cache);
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    __privateSet(this, _initialState, config.state || getDefaultState(this.options));
    this.state = __privateGet(this, _initialState);
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  optionalRemove() {
    if (!__privateGet(this, _observers).length && this.state.fetchStatus === "idle") {
      __privateGet(this, _cache).remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    __privateMethod(this, _dispatch, dispatch_fn).call(this, {
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state2, setStateOptions) {
    __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "setState", state: state2, setStateOptions });
  }
  cancel(options) {
    const promise = __privateGet(this, _promise);
    __privateGet(this, _retryer)?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(__privateGet(this, _initialState));
  }
  isActive() {
    return __privateGet(this, _observers).some(
      (observer) => observer.options.enabled !== false
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || __privateGet(this, _observers).some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = __privateGet(this, _observers).find((x2) => x2.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  onOnline() {
    const observer = __privateGet(this, _observers).find((x2) => x2.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers).includes(observer)) {
      __privateGet(this, _observers).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (__privateGet(this, _observers).includes(observer)) {
      __privateSet(this, _observers, __privateGet(this, _observers).filter((x2) => x2 !== observer));
      if (!__privateGet(this, _observers).length) {
        if (__privateGet(this, _retryer)) {
          if (__privateGet(this, _abortSignalConsumed)) {
            __privateGet(this, _retryer).cancel({ revert: true });
          } else {
            __privateGet(this, _retryer).cancelRetry();
          }
        }
        this.scheduleGc();
      }
      __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return __privateGet(this, _observers).length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (__privateGet(this, _promise)) {
        __privateGet(this, _retryer)?.continueRetry();
        return __privateGet(this, _promise);
      }
    }
    if (options) {
      __privateMethod(this, _setOptions, setOptions_fn).call(this, options);
    }
    if (!this.options.queryFn) {
      const observer = __privateGet(this, _observers).find((x2) => x2.options.queryFn);
      if (observer) {
        __privateMethod(this, _setOptions, setOptions_fn).call(this, observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const queryFnContext = {
      queryKey: this.queryKey,
      meta: this.meta
    };
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          __privateSet(this, _abortSignalConsumed, true);
          return abortController.signal;
        }
      });
    };
    addSignalProperty(queryFnContext);
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject(
          new Error(`Missing queryFn: '${this.options.queryHash}'`)
        );
      }
      __privateSet(this, _abortSignalConsumed, false);
      if (this.options.persister) {
        return this.options.persister(
          this.options.queryFn,
          queryFnContext,
          this
        );
      }
      return this.options.queryFn(
        queryFnContext
      );
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    this.options.behavior?.onFetch(
      context,
      this
    );
    __privateSet(this, _revertState, this.state);
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        __privateMethod(this, _dispatch, dispatch_fn).call(this, {
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        __privateGet(this, _cache).config.onError?.(
          error,
          this
        );
        __privateGet(this, _cache).config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    __privateSet(this, _retryer, createRetryer({
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (typeof data === "undefined") {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        this.setData(data);
        __privateGet(this, _cache).config.onSuccess?.(data, this);
        __privateGet(this, _cache).config.onSettled?.(
          data,
          this.state.error,
          this
        );
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _dispatch, dispatch_fn).call(this, { type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    }));
    __privateSet(this, _promise, __privateGet(this, _retryer).promise);
    return __privateGet(this, _promise);
  }
}, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _promise = new WeakMap(), _retryer = new WeakMap(), _observers = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _setOptions = new WeakSet(), setOptions_fn = function(options) {
  this.options = { ...__privateGet(this, _defaultOptions), ...options };
  this.updateGcTime(this.options.gcTime);
}, _dispatch = new WeakSet(), dispatch_fn = function(action) {
  const reducer = (state2) => {
    switch (action.type) {
      case "failed":
        return {
          ...state2,
          fetchFailureCount: action.failureCount,
          fetchFailureReason: action.error
        };
      case "pause":
        return {
          ...state2,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...state2,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...state2,
          fetchFailureCount: 0,
          fetchFailureReason: null,
          fetchMeta: action.meta ?? null,
          fetchStatus: canFetch(this.options.networkMode) ? "fetching" : "paused",
          ...!state2.dataUpdatedAt && {
            error: null,
            status: "pending"
          }
        };
      case "success":
        return {
          ...state2,
          data: action.data,
          dataUpdateCount: state2.dataUpdateCount + 1,
          dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: false,
          status: "success",
          ...!action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const error = action.error;
        if (isCancelledError(error) && error.revert && __privateGet(this, _revertState)) {
          return { ...__privateGet(this, _revertState), fetchStatus: "idle" };
        }
        return {
          ...state2,
          error,
          errorUpdateCount: state2.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state2.fetchFailureCount + 1,
          fetchFailureReason: error,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...state2,
          isInvalidated: true
        };
      case "setState":
        return {
          ...state2,
          ...action.state
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers).forEach((observer) => {
      observer.onQueryUpdate();
    });
    __privateGet(this, _cache).notify({ query: this, type: "updated", action });
  });
}, _a4);
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = typeof data !== "undefined";
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/queryCache.js
var _queries, _a5;
var QueryCache = (_a5 = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _queries, void 0);
    this.config = config;
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client, options, state2) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state: state2,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!__privateGet(this, _queries).has(query.queryHash)) {
      __privateGet(this, _queries).set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = __privateGet(this, _queries).get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        __privateGet(this, _queries).delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
}, _queries = new WeakMap(), _a5);

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/mutation.js
var _observers2, _defaultOptions2, _mutationCache, _retryer2, _dispatch2, dispatch_fn2, _a6;
var Mutation = (_a6 = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _dispatch2);
    __privateAdd(this, _observers2, void 0);
    __privateAdd(this, _defaultOptions2, void 0);
    __privateAdd(this, _mutationCache, void 0);
    __privateAdd(this, _retryer2, void 0);
    this.mutationId = config.mutationId;
    __privateSet(this, _defaultOptions2, config.defaultOptions);
    __privateSet(this, _mutationCache, config.mutationCache);
    __privateSet(this, _observers2, []);
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = { ...__privateGet(this, _defaultOptions2), ...options };
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers2).includes(observer)) {
      __privateGet(this, _observers2).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _mutationCache).notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    __privateSet(this, _observers2, __privateGet(this, _observers2).filter((x2) => x2 !== observer));
    this.scheduleGc();
    __privateGet(this, _mutationCache).notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!__privateGet(this, _observers2).length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        __privateGet(this, _mutationCache).remove(this);
      }
    }
  }
  continue() {
    return __privateGet(this, _retryer2)?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const executeMutation = () => {
      __privateSet(this, _retryer2, createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject(new Error("No mutationFn found"));
          }
          return this.options.mutationFn(variables);
        },
        onFail: (failureCount, error) => {
          __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "failed", failureCount, error });
        },
        onPause: () => {
          __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "pause" });
        },
        onContinue: () => {
          __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "continue" });
        },
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      }));
      return __privateGet(this, _retryer2).promise;
    };
    const restored = this.state.status === "pending";
    try {
      if (!restored) {
        __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "pending", variables });
        await __privateGet(this, _mutationCache).config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          __privateMethod(this, _dispatch2, dispatch_fn2).call(this, {
            type: "pending",
            context,
            variables
          });
        }
      }
      const data = await executeMutation();
      await __privateGet(this, _mutationCache).config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await __privateGet(this, _mutationCache).config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "success", data });
      return data;
    } catch (error) {
      try {
        await __privateGet(this, _mutationCache).config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await __privateGet(this, _mutationCache).config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        __privateMethod(this, _dispatch2, dispatch_fn2).call(this, { type: "error", error });
      }
    }
  }
}, _observers2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _dispatch2 = new WeakSet(), dispatch_fn2 = function(action) {
  const reducer = (state2) => {
    switch (action.type) {
      case "failed":
        return {
          ...state2,
          failureCount: action.failureCount,
          failureReason: action.error
        };
      case "pause":
        return {
          ...state2,
          isPaused: true
        };
      case "continue":
        return {
          ...state2,
          isPaused: false
        };
      case "pending":
        return {
          ...state2,
          context: action.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: !canFetch(this.options.networkMode),
          status: "pending",
          variables: action.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...state2,
          data: action.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: false
        };
      case "error":
        return {
          ...state2,
          data: void 0,
          error: action.error,
          failureCount: state2.failureCount + 1,
          failureReason: action.error,
          isPaused: false,
          status: "error"
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers2).forEach((observer) => {
      observer.onMutationUpdate(action);
    });
    __privateGet(this, _mutationCache).notify({
      mutation: this,
      type: "updated",
      action
    });
  });
}, _a6);
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/mutationCache.js
var _mutations, _mutationId, _resuming, _a7;
var MutationCache = (_a7 = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _mutations, void 0);
    __privateAdd(this, _mutationId, void 0);
    __privateAdd(this, _resuming, void 0);
    this.config = config;
    __privateSet(this, _mutations, []);
    __privateSet(this, _mutationId, 0);
  }
  build(client, options, state2) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client.defaultMutationOptions(options),
      state: state2
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    __privateGet(this, _mutations).push(mutation);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    __privateSet(this, _mutations, __privateGet(this, _mutations).filter((x2) => x2 !== mutation));
    this.notify({ type: "removed", mutation });
  }
  clear() {
    notifyManager.batch(() => {
      __privateGet(this, _mutations).forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return __privateGet(this, _mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return __privateGet(this, _mutations).find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return __privateGet(this, _mutations).filter(
      (mutation) => matchMutation(filters, mutation)
    );
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    __privateSet(this, _resuming, (__privateGet(this, _resuming) ?? Promise.resolve()).then(() => {
      const pausedMutations = __privateGet(this, _mutations).filter((x2) => x2.state.isPaused);
      return notifyManager.batch(
        () => pausedMutations.reduce(
          (promise, mutation) => promise.then(() => mutation.continue().catch(noop)),
          Promise.resolve()
        )
      );
    }).then(() => {
      __privateSet(this, _resuming, void 0);
    }));
    return __privateGet(this, _resuming);
  }
}, _mutations = new WeakMap(), _mutationId = new WeakMap(), _resuming = new WeakMap(), _a7);

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const fetchFn = async () => {
        const options = context.options;
        const direction = context.fetchOptions?.meta?.fetchMore?.direction;
        const oldPages = context.state.data?.pages || [];
        const oldPageParams = context.state.data?.pageParams || [];
        const empty = { pages: [], pageParams: [] };
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = context.options.queryFn || (() => Promise.reject(
          new Error(`Missing queryFn: '${context.options.queryHash}'`)
        ));
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        let result;
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          result = await fetchPage(
            empty,
            oldPageParams[0] ?? options.initialPageParam
          );
          const remainingPages = pages ?? oldPages.length;
          for (let i3 = 1; i3 < remainingPages; i3++) {
            const param = getNextPageParam(options, result);
            result = await fetchPage(result, param);
          }
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  );
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return options.getPreviousPageParam?.(
    pages[0],
    pages,
    pageParams[0],
    pageParams
  );
}

// node_modules/.pnpm/@tanstack+query-core@5.22.2/node_modules/@tanstack/query-core/build/modern/queryClient.js
var _queryCache, _mutationCache2, _defaultOptions3, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _a8;
var QueryClient = (_a8 = class {
  constructor(config = {}) {
    __privateAdd(this, _queryCache, void 0);
    __privateAdd(this, _mutationCache2, void 0);
    __privateAdd(this, _defaultOptions3, void 0);
    __privateAdd(this, _queryDefaults, void 0);
    __privateAdd(this, _mutationDefaults, void 0);
    __privateAdd(this, _mountCount, void 0);
    __privateAdd(this, _unsubscribeFocus, void 0);
    __privateAdd(this, _unsubscribeOnline, void 0);
    __privateSet(this, _queryCache, config.queryCache || new QueryCache());
    __privateSet(this, _mutationCache2, config.mutationCache || new MutationCache());
    __privateSet(this, _defaultOptions3, config.defaultOptions || {});
    __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mountCount, 0);
  }
  mount() {
    __privateWrapper(this, _mountCount)._++;
    if (__privateGet(this, _mountCount) !== 1)
      return;
    __privateSet(this, _unsubscribeFocus, focusManager.subscribe(() => {
      if (focusManager.isFocused()) {
        this.resumePausedMutations();
        __privateGet(this, _queryCache).onFocus();
      }
    }));
    __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        this.resumePausedMutations();
        __privateGet(this, _queryCache).onOnline();
      }
    }));
  }
  unmount() {
    var _a9, _b;
    __privateWrapper(this, _mountCount)._--;
    if (__privateGet(this, _mountCount) !== 0)
      return;
    (_a9 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a9.call(this);
    __privateSet(this, _unsubscribeFocus, void 0);
    (_b = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b.call(this);
    __privateSet(this, _unsubscribeOnline, void 0);
  }
  isFetching(filters) {
    return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const cachedData = this.getQueryData(options.queryKey);
    return cachedData !== void 0 ? Promise.resolve(cachedData) : this.fetchQuery(options);
  }
  getQueriesData(filters) {
    return this.getQueryCache().findAll(filters).map(({ queryKey, state: state2 }) => {
      const data = state2.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = __privateGet(this, _queryCache).get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (typeof data === "undefined") {
      return void 0;
    }
    return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => this.getQueryCache().findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(options.queryHash)?.state;
  }
  removeQueries(filters) {
    const queryCache = __privateGet(this, _queryCache);
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = __privateGet(this, _queryCache);
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters = {}, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters = {}, options = {}) {
    return notifyManager.batch(() => {
      __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters.refetchType ?? filters.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters = {}, options) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options?.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  resumePausedMutations() {
    return __privateGet(this, _mutationCache2).resumePausedMutations();
  }
  getQueryCache() {
    return __privateGet(this, _queryCache);
  }
  getMutationCache() {
    return __privateGet(this, _mutationCache2);
  }
  getDefaultOptions() {
    return __privateGet(this, _defaultOptions3);
  }
  setDefaultOptions(options) {
    __privateSet(this, _defaultOptions3, options);
  }
  setQueryDefaults(queryKey, options) {
    __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults2 = [...__privateGet(this, _queryDefaults).values()];
    let result = {};
    defaults2.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults2 = [...__privateGet(this, _mutationDefaults).values()];
    let result = {};
    defaults2.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...__privateGet(this, _defaultOptions3).queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (typeof defaultedOptions.throwOnError === "undefined") {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (typeof defaultedOptions.networkMode === "undefined" && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...__privateGet(this, _defaultOptions3).mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    __privateGet(this, _queryCache).clear();
    __privateGet(this, _mutationCache2).clear();
  }
}, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions3 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _a8);

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
  return function wrap3() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/utils.js
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject3 = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject2 = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype3 = getPrototypeOf(val);
  return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject3(val) && isFunction(val.pipe);
var isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i3;
  let l3;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i3 = 0, l3 = obj.length; i3 < l3; i3++) {
      fn.call(null, obj[i3], i3, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i3 = 0; i3 < len; i3++) {
      key = keys[i3];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i3 = keys.length;
  let _key;
  while (i3-- > 0) {
    _key = keys[i3];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge2() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject2(result[targetKey]) && isPlainObject2(val)) {
      result[targetKey] = merge2(result[targetKey], val);
    } else if (isPlainObject2(val)) {
      result[targetKey] = merge2({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i3 = 0, l3 = arguments.length; i3 < l3; i3++) {
    arguments[i3] && forEach(arguments[i3], assignValue);
  }
  return result;
}
var extend = (a3, b3, thisArg, { allOwnKeys } = {}) => {
  forEach(b3, (val, key) => {
    if (thisArg && isFunction(val)) {
      a3[key] = bind(val, thisArg);
    } else {
      a3[key] = val;
    }
  }, { allOwnKeys });
  return a3;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i3;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i3 = props.length;
    while (i3-- > 0) {
      prop = props[i3];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i3 = thing.length;
  if (!isNumber(i3))
    return null;
  const arr = new Array(i3);
  while (i3-- > 0) {
    arr[i3] = thing[i3];
  }
  return arr;
};
var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m3, p1, p22) {
      return p1.toUpperCase() + p22;
    }
  );
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop2 = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i3) => {
    if (isObject3(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i3] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i3 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i3] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject3(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject: isObject3,
  isPlainObject: isPlainObject2,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge: merge2,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop: noop2,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/AxiosError.js
function AxiosError(message2, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message2;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
utils_default.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);
  utils_default.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_default = AxiosError;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/null.js
var null_default = null;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/toFormData.js
function isVisitable(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i3) {
    token = removeBrackets(token);
    return !dots && i3 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (null_default || FormData)();
  options = utils_default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils_default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils_default.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
var toFormData_default = toFormData;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function encode4(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
}
var prototype2 = AxiosURLSearchParams.prototype;
prototype2.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype2.toString = function toString2(encoder3) {
  const _encode = encoder3 ? function(value) {
    return encoder3.call(this, value, encode4);
  } : encode4;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/buildURL.js
function encode5(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode5;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
};
var InterceptorManager_default = InterceptorManager;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default = typeof FormData !== "undefined" ? FormData : null;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default = typeof Blob !== "undefined" ? Blob : null;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/browser/index.js
var browser_default = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: Blob_default
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/common/utils.js
var utils_exports = {};
__export(utils_exports, {
  hasBrowserEnv: () => hasBrowserEnv,
  hasStandardBrowserEnv: () => hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var hasStandardBrowserEnv = ((product) => {
  return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
})(typeof navigator !== "undefined" && navigator.product);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/platform/index.js
var platform_default = {
  ...utils_exports,
  ...browser_default
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new platform_default.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/formDataToJSON.js
function parsePropPath(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i3;
  const len = keys.length;
  let key;
  for (i3 = 0; i3 < len; i3++) {
    key = keys[i3];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__")
      return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var formDataToJSON_default = formDataToJSON;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/defaults/index.js
function stringifySafely(rawValue, parser, encoder3) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder3 || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils_default.isObject(data);
    if (isObjectPayload && utils_default.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils_default.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
    }
    if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data)) {
      return data;
    }
    if (utils_default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils_default.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData_default(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError_default.from(e2, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var defaults_default = defaults;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i3;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i3 = line.indexOf(":");
    key = line.substring(0, i3).trim().toLowerCase();
    val = line.substring(i3 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/AxiosHeaders.js
var $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value))
    return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w3, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders = class {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i3 = keys.length;
    let deleted = false;
    while (i3--) {
      const key = keys[i3];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype3 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype3, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/transformData.js
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/cancel/CanceledError.js
function CanceledError(message2, config, request) {
  AxiosError_default.call(this, message2 == null ? "canceled" : message2, AxiosError_default.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils_default.inherits(CanceledError, AxiosError_default, {
  __CANCEL__: true
});
var CanceledError_default = CanceledError;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/settle.js
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_default(
      "Request failed with status code " + response.status,
      [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils_default.isString(path) && cookie.push("path=" + path);
      utils_default.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/isAbsoluteURL.js
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/buildFullPath.js
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin(requestURL) {
      const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }()
);

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/speedometer.js
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now2 = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now2;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now2;
    let i3 = tail;
    let bytesCount = 0;
    while (i3 !== head) {
      bytesCount += bytes[i3++];
      i3 = i3 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now2 - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now2 - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
var speedometer_default = speedometer;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/adapters/xhr.js
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return (e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2
    };
    data[isDownloadStream ? "download" : "upload"] = true;
    listener(data);
  };
}
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders_default.from(config.headers).normalize();
    let { responseType, withXSRFToken } = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    let contentType;
    if (utils_default.isFormData(requestData)) {
      if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false);
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    let request = new XMLHttpRequest();
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
    }
    const fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = config.transitional || transitional_default;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError_default(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    if (platform_default.hasStandardBrowserEnv) {
      withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(fullPath)) {
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies_default.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
    }
    if (typeof config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(fullPath);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: null_default,
  xhr: xhr_default
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
var adapters_default = {
  getAdapter: (adapters) => {
    adapters = utils_default.isArray(adapters) ? adapters : [adapters];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i3 = 0; i3 < length; i3++) {
      nameOrAdapter = adapters[i3];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError_default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i3] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state2]) => `adapter ${id} ` + (state2 === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s3 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError_default(
        `There is no suitable adapter to dispatch the request ` + s3,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/dispatchRequest.js
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders_default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a3, b3, caseless) {
    if (!utils_default.isUndefined(b3)) {
      return getMergedValue(a3, b3, caseless);
    } else if (!utils_default.isUndefined(a3)) {
      return getMergedValue(void 0, a3, caseless);
    }
  }
  function valueFromConfig2(a3, b3) {
    if (!utils_default.isUndefined(b3)) {
      return getMergedValue(void 0, b3);
    }
  }
  function defaultToConfig2(a3, b3) {
    if (!utils_default.isUndefined(b3)) {
      return getMergedValue(void 0, b3);
    } else if (!utils_default.isUndefined(a3)) {
      return getMergedValue(void 0, a3);
    }
  }
  function mergeDirectKeys(a3, b3, prop) {
    if (prop in config2) {
      return getMergedValue(a3, b3);
    } else if (prop in config1) {
      return getMergedValue(void 0, a3);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a3, b3) => mergeDeepProperties(headersToObject(a3), headersToObject(b3), true)
  };
  utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge3 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge3(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge3 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/env/data.js
var VERSION = "1.6.7";

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/validator.js
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i3) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i3 < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional(validator, version, message2) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message2 ? ". " + message2 : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError_default.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i3 = keys.length;
  while (i3-- > 0) {
    const opt = keys[i3];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === void 0 || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
}
var validator_default = {
  assertOptions,
  validators
};

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/core/Axios.js
var validators2 = validator_default.validators;
var Axios = class {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_default(),
      response: new InterceptorManager_default()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;
        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        if (!err.stack) {
          err.stack = stack;
        } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
          err.stack += "\n" + stack;
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator_default.assertOptions(transitional2, {
        silentJSONParsing: validators2.transitional(validators2.boolean),
        forcedJSONParsing: validators2.transitional(validators2.boolean),
        clarifyTimeoutError: validators2.transitional(validators2.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(paramsSerializer, {
          encode: validators2.function,
          serialize: validators2.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils_default.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils_default.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i3 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i3 < len) {
        promise = promise.then(chain[i3++], chain[i3++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i3 = 0;
    while (i3 < len) {
      const onFulfilled = requestInterceptorChain[i3++];
      const onRejected = requestInterceptorChain[i3++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i3 = 0;
    len = responseInterceptorChain.length;
    while (i3 < len) {
      promise = promise.then(responseInterceptorChain[i3++], responseInterceptorChain[i3++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/cancel/CancelToken.js
var CancelToken = class _CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i3 = token._listeners.length;
      while (i3-- > 0) {
        token._listeners[i3](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message2, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message2, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new _CancelToken(function executor(c3) {
      cancel = c3;
    });
    return {
      token,
      cancel
    };
  }
};
var CancelToken_default = CancelToken;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/spread.js
function spread(callback2) {
  return function wrap3(arr) {
    return callback2.apply(null, arr);
  };
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/isAxiosError.js
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/lib/axios.js
function createInstance(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// node_modules/.pnpm/axios@1.6.7/node_modules/axios/index.js
var {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel: isCancel2,
  CancelToken: CancelToken2,
  VERSION: VERSION2,
  all: all2,
  Cancel,
  isAxiosError: isAxiosError2,
  spread: spread2,
  toFormData: toFormData2,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode: HttpStatusCode2,
  formToJSON,
  getAdapter,
  mergeConfig: mergeConfig2
} = axios_default;

// node_modules/.pnpm/@auth+core@0.18.6/node_modules/@auth/core/providers/credentials.js
function Credentials(config) {
  return {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize: () => null,
    // @ts-expect-error
    options: config
  };
}

// .vercel/output/_functions/chunks/pages/__0HWJhrTK.mjs
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e2
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value2);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse3(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key) {
        return key.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse3;
setCookie.exports.parse = parse3;
var parseString_1 = setCookie.exports.parseString = parseString;
setCookie.exports.splitCookiesString = splitCookiesString;
var env = createEnv({
  server: {
    AUTH_TRUST_HOST: z2.literal("true"),
    AUTH_SECRET: z2.string().min(1),
    TIPTAP_PRO_TOKEN: z2.string().min(1),
    OPEN_AI_API_KEY: z2.string().min(1)
  },
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_API_ENDPOINT: z2.string().min(1)
  },
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: Object.assign({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": void 0, "ASSETS_PREFIX": void 0 }, { _: process.env._ }),
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true
});
var queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 1e3,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retryOnMount: true
    }
  }
});
var queryInstance = axios_default.create({
  baseURL: env.PUBLIC_API_ENDPOINT
});
async function postSignIn(signInType) {
  return queryInstance.post("/auth/sign-in", signInType);
}
var defineConfig = (config) => {
  config.prefix ?? (config.prefix = "/api/auth");
  return config;
};
var authConfig = defineConfig({
  providers: [
    Credentials({
      id: "credentials",
      authorize: async (credentials, _4) => {
        if (!credentials.email || !credentials.password)
          return null;
        try {
          const res = await postSignIn({
            email: credentials.email,
            password: credentials.password
          });
          return {
            ...res.data.data,
            ...res.data.meta
          };
        } catch (err) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return {
        ...token,
        ...user
      };
    },
    session: ({ session: session2, token }) => {
      session2.user = {
        id: token.id,
        type: token.type,
        ...token.attributes
      };
      session2.tokens = {
        iat: token.iat,
        exp: token.exp,
        jti: token.jti,
        sub: token.sub,
        at: token.accessToken,
        rt: token.refreshToken
      };
      return {
        ...session2
      };
    }
  },
  pages: {
    error: "/500",
    newUser: "/onboarding/welcome",
    signIn: "/auth/sign-in",
    signOut: "/",
    verifyRequest: "/confirm-email"
  },
  session: {
    strategy: "jwt"
  },
  trustHost: true
});
var actions2 = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions2.includes(action) || !url.pathname.startsWith(prefix + "/"))
      return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      res.headers.getSetCookie().forEach((cookie) => {
        const { name, value, ...options2 } = parseString_1(cookie);
        cookies.set(name, value, options2);
      });
      res.headers.delete("Set-Cookie");
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": void 0, "ASSETS_PREFIX": void 0 }, { _: process.env._, NODE: process.env.NODE, NODE_ENV: "development" });
  options.secret ?? (options.secret = AUTH_SECRET);
  options.trustHost ?? (options.trustHost = !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production"));
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ?? (options.secret = Object.assign({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": void 0, "ASSETS_PREFIX": void 0 }, { _: process.env._, NODE: process.env.NODE, NODE_ENV: "development" }).AUTH_SECRET);
  options.trustHost ?? (options.trustHost = true);
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
var { GET, POST } = AstroAuth();

// .vercel/output/_functions/_astro-internal_middleware.mjs
async function auth(context, next) {
  const currentPathname = context.url.pathname;
  const isAuthPath = currentPathname.startsWith("/auth");
  const isConfirmPath = currentPathname === "/auth/confirm-email";
  const session2 = await getSession(context.request);
  const isUserLoggedIn = session2?.user;
  const isEmailVerified = !!session2?.user.confirmed_at;
  if (isConfirmPath && isEmailVerified) {
    return context.redirect("/");
  }
  if (isAuthPath && !isConfirmPath && isUserLoggedIn) {
    return context.redirect("/");
  }
  return await next();
}
var onRequest$1 = sequence(auth);
var onRequest = sequence(
  onRequest$1
);

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/cookies/cookies.js
var import_cookie6 = __toESM(require_cookie(), 1);

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/errors/errors-data.js
var errors_data_exports = {};
__export(errors_data_exports, {
  AstroGlobNoMatch: () => AstroGlobNoMatch,
  AstroGlobUsedOutside: () => AstroGlobUsedOutside,
  CSSSyntaxError: () => CSSSyntaxError,
  CantRenderPage: () => CantRenderPage,
  ClientAddressNotAvailable: () => ClientAddressNotAvailable,
  CollectionDoesNotExistError: () => CollectionDoesNotExistError,
  ConfigLegacyKey: () => ConfigLegacyKey,
  ConfigNotFound: () => ConfigNotFound,
  ContentCollectionTypeMismatchError: () => ContentCollectionTypeMismatchError,
  ContentSchemaContainsSlugError: () => ContentSchemaContainsSlugError,
  CouldNotTransformImage: () => CouldNotTransformImage,
  DataCollectionEntryParseError: () => DataCollectionEntryParseError,
  DuplicateContentEntrySlugError: () => DuplicateContentEntrySlugError,
  ExpectedImage: () => ExpectedImage,
  ExpectedImageOptions: () => ExpectedImageOptions,
  FailedToFetchRemoteImageDimensions: () => FailedToFetchRemoteImageDimensions,
  FailedToFindPageMapSSR: () => FailedToFindPageMapSSR,
  FailedToLoadModuleSSR: () => FailedToLoadModuleSSR,
  GenerateContentTypesError: () => GenerateContentTypesError,
  GetStaticPathsExpectedParams: () => GetStaticPathsExpectedParams,
  GetStaticPathsInvalidRouteParam: () => GetStaticPathsInvalidRouteParam,
  GetStaticPathsRemovedRSSHelper: () => GetStaticPathsRemovedRSSHelper,
  GetStaticPathsRequired: () => GetStaticPathsRequired,
  ImageMissingAlt: () => ImageMissingAlt,
  ImageNotFound: () => ImageNotFound,
  IncompatibleDescriptorOptions: () => IncompatibleDescriptorOptions,
  InvalidComponentArgs: () => InvalidComponentArgs,
  InvalidContentEntryFrontmatterError: () => InvalidContentEntryFrontmatterError,
  InvalidContentEntrySlugError: () => InvalidContentEntrySlugError,
  InvalidDynamicRoute: () => InvalidDynamicRoute,
  InvalidFrontmatterInjectionError: () => InvalidFrontmatterInjectionError,
  InvalidGetStaticPathParam: () => InvalidGetStaticPathParam,
  InvalidGetStaticPathsEntry: () => InvalidGetStaticPathsEntry,
  InvalidGetStaticPathsReturn: () => InvalidGetStaticPathsReturn,
  InvalidGlob: () => InvalidGlob,
  InvalidImageService: () => InvalidImageService,
  InvalidPrerenderExport: () => InvalidPrerenderExport,
  LocalImageUsedWrongly: () => LocalImageUsedWrongly,
  LocalsNotAnObject: () => LocalsNotAnObject,
  MarkdownFrontmatterParseError: () => MarkdownFrontmatterParseError,
  MarkdownImageNotFound: () => MarkdownImageNotFound,
  MdxIntegrationMissingError: () => MdxIntegrationMissingError,
  MiddlewareCantBeLoaded: () => MiddlewareCantBeLoaded,
  MiddlewareNoDataOrNextCalled: () => MiddlewareNoDataOrNextCalled,
  MiddlewareNotAResponse: () => MiddlewareNotAResponse,
  MissingImageDimension: () => MissingImageDimension,
  MissingIndexForInternationalization: () => MissingIndexForInternationalization,
  MissingLocale: () => MissingLocale,
  MissingMediaQueryDirective: () => MissingMediaQueryDirective,
  MissingSharp: () => MissingSharp,
  MixedContentDataCollectionError: () => MixedContentDataCollectionError,
  NoAdapterInstalled: () => NoAdapterInstalled,
  NoClientEntrypoint: () => NoClientEntrypoint,
  NoClientOnlyHint: () => NoClientOnlyHint,
  NoImageMetadata: () => NoImageMetadata,
  NoMatchingImport: () => NoMatchingImport,
  NoMatchingRenderer: () => NoMatchingRenderer,
  NoMatchingStaticPathFound: () => NoMatchingStaticPathFound,
  NoPrerenderedRoutesWithDomains: () => NoPrerenderedRoutesWithDomains,
  OnlyResponseCanBeReturned: () => OnlyResponseCanBeReturned,
  PageNumberParamNotFound: () => PageNumberParamNotFound,
  PrerenderDynamicEndpointPathCollide: () => PrerenderDynamicEndpointPathCollide,
  RedirectWithNoLocation: () => RedirectWithNoLocation,
  ReservedSlotName: () => ReservedSlotName,
  ResponseSentError: () => ResponseSentError,
  StaticClientAddressNotAvailable: () => StaticClientAddressNotAvailable,
  StaticRedirectNotAvailable: () => StaticRedirectNotAvailable,
  UnhandledRejection: () => UnhandledRejection,
  UnknownCLIError: () => UnknownCLIError,
  UnknownCSSError: () => UnknownCSSError,
  UnknownCompilerError: () => UnknownCompilerError,
  UnknownConfigError: () => UnknownConfigError,
  UnknownContentCollectionError: () => UnknownContentCollectionError,
  UnknownError: () => UnknownError,
  UnknownMarkdownError: () => UnknownMarkdownError,
  UnknownViteError: () => UnknownViteError,
  UnsupportedConfigTransformError: () => UnsupportedConfigTransformError,
  UnsupportedImageConversion: () => UnsupportedImageConversion,
  UnsupportedImageFormat: () => UnsupportedImageFormat,
  i18nNotEnabled: () => i18nNotEnabled
});
var UnknownCompilerError = {
  name: "UnknownCompilerError",
  title: "Unknown compiler error.",
  hint: "This is almost always a problem with the Astro compiler, not your code. Please open an issue at https://astro.build/issues/compiler."
};
var StaticRedirectNotAvailable = {
  name: "StaticRedirectNotAvailable",
  title: "`Astro.redirect` is not available in static mode.",
  message: "Redirects are only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR."
};
var ClientAddressNotAvailable = {
  name: "ClientAddressNotAvailable",
  title: "`Astro.clientAddress` is not available in current adapter.",
  message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
};
var StaticClientAddressNotAvailable = {
  name: "StaticClientAddressNotAvailable",
  title: "`Astro.clientAddress` is not available in static mode.",
  message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR."
};
var NoMatchingStaticPathFound = {
  name: "NoMatchingStaticPathFound",
  title: "No static path found for requested path.",
  message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
  hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
};
var OnlyResponseCanBeReturned = {
  name: "OnlyResponseCanBeReturned",
  title: "Invalid type returned by Astro page.",
  message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
};
var MissingMediaQueryDirective = {
  name: "MissingMediaQueryDirective",
  title: "Missing value for `client:media` directive.",
  message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
};
var NoMatchingRenderer = {
  name: "NoMatchingRenderer",
  title: "No matching renderer found.",
  message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are" : "is"} ${validRenderersCount} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
  hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.`
};
var NoClientEntrypoint = {
  name: "NoClientEntrypoint",
  title: "No client entrypoint specified in renderer.",
  message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
  hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
};
var NoClientOnlyHint = {
  name: "NoClientOnlyHint",
  title: "Missing hint on client:only directive.",
  message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
  hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
};
var InvalidGetStaticPathParam = {
  name: "InvalidGetStaticPathParam",
  title: "Invalid value returned by a `getStaticPaths` path.",
  message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
var InvalidGetStaticPathsEntry = {
  name: "InvalidGetStaticPathsEntry",
  title: "Invalid entry inside getStaticPath's return value",
  message: (entryType) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${entryType}\``,
  hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
var InvalidGetStaticPathsReturn = {
  name: "InvalidGetStaticPathsReturn",
  title: "Invalid value returned by getStaticPaths.",
  message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
var GetStaticPathsRemovedRSSHelper = {
  name: "GetStaticPathsRemovedRSSHelper",
  title: "getStaticPaths RSS helper is not available anymore.",
  message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
  hint: "See https://docs.astro.build/en/guides/rss/ for more information."
};
var GetStaticPathsExpectedParams = {
  name: "GetStaticPathsExpectedParams",
  title: "Missing params property on `getStaticPaths` route.",
  message: "Missing or empty required `params` property on `getStaticPaths` route.",
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
var GetStaticPathsInvalidRouteParam = {
  name: "GetStaticPathsInvalidRouteParam",
  title: "Invalid value for `getStaticPaths` route parameter.",
  message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
var GetStaticPathsRequired = {
  name: "GetStaticPathsRequired",
  title: "`getStaticPaths()` function required for dynamic routes.",
  message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
  hint: `See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` or \`output: "hybrid"\` in your Astro config file to switch to a non-static server build. This error can also occur if using \`export const prerender = true;\`.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
};
var ReservedSlotName = {
  name: "ReservedSlotName",
  title: "Invalid slot name.",
  message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
};
var NoAdapterInstalled = {
  name: "NoAdapterInstalled",
  title: "Cannot use Server-side Rendering without an adapter.",
  message: `Cannot use \`output: 'server'\` or \`output: 'hybrid'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
};
var NoMatchingImport = {
  name: "NoMatchingImport",
  title: "No import found for component.",
  message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
  hint: "Please make sure the component is properly imported."
};
var InvalidPrerenderExport = {
  name: "InvalidPrerenderExport",
  title: "Invalid prerender export.",
  message(prefix, suffix, isHydridOuput) {
    const defaultExpectedValue = isHydridOuput ? "false" : "true";
    let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
    if (prefix !== "const")
      msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
    if (suffix !== "true")
      msg += `
Expected \`${defaultExpectedValue}\` value but got \`${suffix}\`.`;
    return msg;
  },
  hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
};
var InvalidComponentArgs = {
  name: "InvalidComponentArgs",
  title: "Invalid component arguments.",
  message: (name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`,
  hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
};
var PageNumberParamNotFound = {
  name: "PageNumberParamNotFound",
  title: "Page number param not found.",
  message: (paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`,
  hint: "Rename your file to `[page].astro` or `[...page].astro`."
};
var ImageMissingAlt = {
  name: "ImageMissingAlt",
  title: 'Image missing required "alt" property.',
  message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.',
  hint: 'Use an empty string ("") for decorative images.'
};
var InvalidImageService = {
  name: "InvalidImageService",
  title: "Error while loading image service.",
  message: "There was an error loading the configured image service. Please see the stack trace for more information."
};
var MissingImageDimension = {
  name: "MissingImageDimension",
  title: "Missing image dimensions",
  message: (missingDimension, imageURL) => `Missing ${missingDimension === "both" ? "width and height attributes" : `${missingDimension} attribute`} for ${imageURL}. When using remote images, both dimensions are required unless in order to avoid CLS.`,
  hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets). You can also use `inferSize={true}` for remote images to get the original dimensions."
};
var FailedToFetchRemoteImageDimensions = {
  name: "FailedToFetchRemoteImageDimensions",
  title: "Failed to retrieve remote image dimensions",
  message: (imageURL) => `Failed to get the dimensions for ${imageURL}.`,
  hint: "Verify your remote image URL is accurate, and that you are not using `inferSize` with a file located in your `public/` folder."
};
var UnsupportedImageFormat = {
  name: "UnsupportedImageFormat",
  title: "Unsupported image format",
  message: (format, imagePath, supportedFormats) => `Received unsupported format \`${format}\` from \`${imagePath}\`. Currently only ${supportedFormats.join(
    ", "
  )} are supported by our image services.`,
  hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for."
};
var UnsupportedImageConversion = {
  name: "UnsupportedImageConversion",
  title: "Unsupported image conversion",
  message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported."
};
var PrerenderDynamicEndpointPathCollide = {
  name: "PrerenderDynamicEndpointPathCollide",
  title: "Prerendered dynamic endpoint has path collision.",
  message: (pathname) => `Could not render \`${pathname}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
  hint: (filename) => `Rename \`${filename}\` to \`${filename.replace(/\.(?:js|ts)/, (m3) => `.json` + m3)}\``
};
var ExpectedImage = {
  name: "ExpectedImage",
  title: "Expected src to be an image.",
  message: (src, typeofOptions, fullOptions) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${src}\` (type: \`${typeofOptions}\`).

Full serialized options received: \`${fullOptions}\`.`,
  hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it."
};
var ExpectedImageOptions = {
  name: "ExpectedImageOptions",
  title: "Expected image options.",
  message: (options) => `Expected getImage() parameter to be an object. Received \`${options}\`.`
};
var IncompatibleDescriptorOptions = {
  name: "IncompatibleDescriptorOptions",
  title: "Cannot set both `densities` and `widths`",
  message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.",
  hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors."
};
var ImageNotFound = {
  name: "ImageNotFound",
  title: "Image not found.",
  message: (imagePath) => `Could not find requested image \`${imagePath}\`. Does it exist?`,
  hint: "This is often caused by a typo in the image path. Please make sure the file exists, and is spelled correctly."
};
var NoImageMetadata = {
  name: "NoImageMetadata",
  title: "Could not process image metadata.",
  message: (imagePath) => `Could not process image metadata${imagePath ? ` for \`${imagePath}\`` : ""}.`,
  hint: "This is often caused by a corrupted or malformed image. Re-exporting the image from your image editor may fix this issue."
};
var MarkdownImageNotFound = {
  name: "MarkdownImageNotFound",
  title: "Image not found.",
  message: (imagePath, fullImagePath) => `Could not find requested image \`${imagePath}\`${fullImagePath ? ` at \`${fullImagePath}\`.` : "."}`,
  hint: "This is often caused by a typo in the image path. Please make sure the file exists, and is spelled correctly."
};
var CouldNotTransformImage = {
  name: "CouldNotTransformImage",
  title: "Could not transform image.",
  message: (imagePath) => `Could not transform image \`${imagePath}\`. See the stack trace for more information.`,
  hint: "This is often caused by a corrupted or malformed image. Re-exporting the image from your image editor may fix this issue."
};
var ResponseSentError = {
  name: "ResponseSentError",
  title: "Unable to set response.",
  message: "The response has already been sent to the browser and cannot be altered."
};
var MiddlewareNoDataOrNextCalled = {
  name: "MiddlewareNoDataOrNextCalled",
  title: "The middleware didn't return a `Response`.",
  message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function."
};
var MiddlewareNotAResponse = {
  name: "MiddlewareNotAResponse",
  title: "The middleware returned something that is not a `Response` object.",
  message: "Any data returned from middleware must be a valid `Response` object."
};
var LocalsNotAnObject = {
  name: "LocalsNotAnObject",
  title: "Value assigned to `locals` is not accepted.",
  message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
  hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."
};
var MiddlewareCantBeLoaded = {
  name: "MiddlewareCantBeLoaded",
  title: "Can't load the middleware.",
  message: "The middleware threw an error while Astro was trying to loading it."
};
var LocalImageUsedWrongly = {
  name: "LocalImageUsedWrongly",
  title: "Local images must be imported.",
  message: (imageFilePath) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${imageFilePath}\`.`,
  hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property."
};
var AstroGlobUsedOutside = {
  name: "AstroGlobUsedOutside",
  title: "Astro.glob() used outside of an Astro file.",
  message: (globStr) => `\`Astro.glob(${globStr})\` can only be used in \`.astro\` files. \`import.meta.glob(${globStr})\` can be used instead to achieve a similar result.`,
  hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import"
};
var AstroGlobNoMatch = {
  name: "AstroGlobNoMatch",
  title: "Astro.glob() did not match any files.",
  message: (globStr) => `\`Astro.glob(${globStr})\` did not return any matching files.`,
  hint: "Check the pattern for typos."
};
var RedirectWithNoLocation = {
  name: "RedirectWithNoLocation",
  title: "A redirect must be given a location with the `Location` header."
};
var InvalidDynamicRoute = {
  name: "InvalidDynamicRoute",
  title: "Invalid dynamic route.",
  message: (route, invalidParam, received) => `The ${invalidParam} param for route ${route} is invalid. Received **${received}**.`
};
var MissingSharp = {
  name: "MissingSharp",
  title: "Could not find Sharp.",
  message: "Could not find Sharp. Please install Sharp (`sharp`) manually into your project or migrate to another image service.",
  hint: "See Sharp's installation instructions for more information: https://sharp.pixelplumbing.com/install. If you are not relying on `astro:assets` to optimize, transform, or process any images, you can configure a passthrough image service instead of installing Sharp. See https://docs.astro.build/en/reference/errors/missing-sharp for more information.\n\nSee https://docs.astro.build/en/guides/images/#default-image-service for more information on how to migrate to another image service."
};
var UnknownViteError = {
  name: "UnknownViteError",
  title: "Unknown Vite Error."
};
var FailedToLoadModuleSSR = {
  name: "FailedToLoadModuleSSR",
  title: "Could not import file.",
  message: (importName) => `Could not import \`${importName}\`.`,
  hint: "This is often caused by a typo in the import path. Please make sure the file exists."
};
var InvalidGlob = {
  name: "InvalidGlob",
  title: "Invalid glob pattern.",
  message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
  hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
};
var FailedToFindPageMapSSR = {
  name: "FailedToFindPageMapSSR",
  title: "Astro couldn't find the correct page to render",
  message: "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error. Please file an issue."
};
var MissingLocale = {
  name: "MissingLocaleError",
  title: "The provided locale does not exist.",
  message: (locale) => `The locale/path \`${locale}\` does not exist in the configured \`i18n.locales\`.`
};
var MissingIndexForInternationalization = {
  name: "MissingIndexForInternationalizationError",
  title: "Index page not found.",
  message: (defaultLocale) => `Could not find index page. A root index page is required in order to create a redirect to the index URL of the default locale. (\`/${defaultLocale}\`)`,
  hint: (src) => `Create an index page (\`index.astro, index.md, etc.\`) in \`${src}\`.`
};
var NoPrerenderedRoutesWithDomains = {
  name: "NoPrerenderedRoutesWithDomains",
  title: "Prerendered routes aren't supported when internationalization domains are enabled.",
  message: (component) => `Static pages aren't yet supported with multiple domains. If you wish to enable this feature, you have to disable prerendering for the page ${component}`
};
var CantRenderPage = {
  name: "CantRenderPage",
  title: "Astro can't render the route.",
  message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.",
  hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server"
};
var UnhandledRejection = {
  name: "UnhandledRejection",
  title: "Unhandled rejection",
  message: (stack) => `Astro detected an unhandled rejection. Here's the stack trace:
${stack}`,
  hint: "Make sure your promises all have an `await` or a `.catch()` handler."
};
var i18nNotEnabled = {
  name: "i18nNotEnabled",
  title: "i18n Not Enabled",
  message: "The `astro:i18n` module can not be used without enabling i18n in your Astro config.",
  hint: "See https://docs.astro.build/en/guides/internationalization for a guide on setting up i18n."
};
var UnknownCSSError = {
  name: "UnknownCSSError",
  title: "Unknown CSS Error."
};
var CSSSyntaxError = {
  name: "CSSSyntaxError",
  title: "CSS Syntax Error."
};
var UnknownMarkdownError = {
  name: "UnknownMarkdownError",
  title: "Unknown Markdown Error."
};
var MarkdownFrontmatterParseError = {
  name: "MarkdownFrontmatterParseError",
  title: "Failed to parse Markdown frontmatter."
};
var InvalidFrontmatterInjectionError = {
  name: "InvalidFrontmatterInjectionError",
  title: "Invalid frontmatter injection.",
  message: 'A remark or rehype plugin attempted to inject invalid frontmatter. Ensure "astro.frontmatter" is set to a valid JSON object that is not `null` or `undefined`.',
  hint: "See the frontmatter injection docs https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically for more information."
};
var MdxIntegrationMissingError = {
  name: "MdxIntegrationMissingError",
  title: "MDX integration missing.",
  message: (file) => `Unable to render ${file}. Ensure that the \`@astrojs/mdx\` integration is installed.`,
  hint: "See the MDX integration docs for installation and usage instructions: https://docs.astro.build/en/guides/integrations-guide/mdx/"
};
var UnknownConfigError = {
  name: "UnknownConfigError",
  title: "Unknown configuration error."
};
var ConfigNotFound = {
  name: "ConfigNotFound",
  title: "Specified configuration file not found.",
  message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
};
var ConfigLegacyKey = {
  name: "ConfigLegacyKey",
  title: "Legacy configuration detected.",
  message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
  hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
};
var UnknownCLIError = {
  name: "UnknownCLIError",
  title: "Unknown CLI Error."
};
var GenerateContentTypesError = {
  name: "GenerateContentTypesError",
  title: "Failed to generate content types.",
  message: (errorMessage) => `\`astro sync\` command failed to generate content collection types: ${errorMessage}`,
  hint: "Check your `src/content/config.*` file for typos."
};
var UnknownContentCollectionError = {
  name: "UnknownContentCollectionError",
  title: "Unknown Content Collection Error."
};
var InvalidContentEntryFrontmatterError = {
  name: "InvalidContentEntryFrontmatterError",
  title: "Content entry frontmatter does not match schema.",
  message(collection, entryId, error) {
    return [
      `**${String(collection)} \u2192 ${String(
        entryId
      )}** frontmatter does not match collection schema.`,
      ...error.errors.map((zodError) => zodError.message)
    ].join("\n");
  },
  hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
};
var InvalidContentEntrySlugError = {
  name: "InvalidContentEntrySlugError",
  title: "Invalid content entry slug.",
  message(collection, entryId) {
    return `${String(collection)} \u2192 ${String(
      entryId
    )} has an invalid slug. \`slug\` must be a string.`;
  },
  hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
};
var ContentSchemaContainsSlugError = {
  name: "ContentSchemaContainsSlugError",
  title: "Content Schema should not contain `slug`.",
  message: (collectionName) => `A content collection schema should not contain \`slug\` since it is reserved for slug generation. Remove this from your ${collectionName} collection schema.`,
  hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
};
var CollectionDoesNotExistError = {
  name: "CollectionDoesNotExistError",
  title: "Collection does not exist",
  message: (collectionName) => `The collection **${collectionName}** does not exist. Ensure a collection directory with this name exists.`,
  hint: "See https://docs.astro.build/en/guides/content-collections/ for more on creating collections."
};
var MixedContentDataCollectionError = {
  name: "MixedContentDataCollectionError",
  title: "Content and data cannot be in same collection.",
  message: (collectionName) => `**${collectionName}** contains a mix of content and data entries. All entries must be of the same type.`,
  hint: "Store data entries in a new collection separate from your content collection."
};
var ContentCollectionTypeMismatchError = {
  name: "ContentCollectionTypeMismatchError",
  title: "Collection contains entries of a different type.",
  message: (collection, expectedType, actualType) => `${collection} contains ${expectedType} entries, but is configured as a ${actualType} collection.`
};
var DataCollectionEntryParseError = {
  name: "DataCollectionEntryParseError",
  title: "Data collection entry failed to parse.",
  message(entryId, errorMessage) {
    return `**${entryId}** failed to parse: ${errorMessage}`;
  },
  hint: "Ensure your data entry is an object with valid JSON (for `.json` entries) or YAML (for `.yaml` entries)."
};
var DuplicateContentEntrySlugError = {
  name: "DuplicateContentEntrySlugError",
  title: "Duplicate content entry slug.",
  message(collection, slug, preExisting, alsoFound) {
    return `**${collection}** contains multiple entries with the same slug: \`${slug}\`. Slugs must be unique.

Entries: 
- ${preExisting}
- ${alsoFound}`;
  }
};
var UnsupportedConfigTransformError = {
  name: "UnsupportedConfigTransformError",
  title: "Unsupported transform in content config.",
  message: (parseError) => `\`transform()\` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).
Full error: ${parseError}`,
  hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
};
var UnknownError = { name: "UnknownError", title: "Unknown Error." };

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/errors/utils.js
function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/errors/printer.js
function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n3 = -2; n3 <= 2; n3++) {
    if (lines[loc.line + n3])
      visibleLines.push(loc.line + n3);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w3 = `> ${lineNo}`;
    if (w3.length > gutterWidth)
      gutterWidth = w3.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/errors/errors.js
var AstroError = class extends Error {
  constructor(props, options) {
    const { name, title, message: message2, stack, location, hint, frame } = props;
    super(message2, options);
    __publicField(this, "loc");
    __publicField(this, "title");
    __publicField(this, "hint");
    __publicField(this, "frame");
    __publicField(this, "type", "AstroError");
    this.title = title;
    this.name = name;
    if (message2)
      this.message = message2;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message2) {
    this.message = message2;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
};

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = Symbol.for("astro.responseSent");
var AstroCookie = class {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false")
      return false;
    if (this.value === "0")
      return false;
    return Boolean(this.value);
  }
};
var _request, _requestValues, _outgoing, _consumed, _ensureParsed, ensureParsed_fn, _ensureOutgoingMap, ensureOutgoingMap_fn, _parse, parse_fn;
var AstroCookies = class {
  constructor(request) {
    __privateAdd(this, _ensureParsed);
    __privateAdd(this, _ensureOutgoingMap);
    __privateAdd(this, _parse);
    __privateAdd(this, _request, void 0);
    __privateAdd(this, _requestValues, void 0);
    __privateAdd(this, _outgoing, void 0);
    __privateAdd(this, _consumed, void 0);
    __privateSet(this, _request, request);
    __privateSet(this, _requestValues, null);
    __privateSet(this, _outgoing, null);
    __privateSet(this, _consumed, false);
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const serializeOptions = {
      expires: DELETED_EXPIRATION
    };
    if (options?.domain) {
      serializeOptions.domain = options.domain;
    }
    if (options?.path) {
      serializeOptions.path = options.path;
    }
    __privateMethod(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
      DELETED_VALUE,
      (0, import_cookie6.serialize)(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key, options = void 0) {
    if (__privateGet(this, _outgoing)?.has(key)) {
      let [serializedValue, , isSetValue] = __privateGet(this, _outgoing).get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const values = __privateMethod(this, _ensureParsed, ensureParsed_fn).call(this, options);
    if (key in values) {
      const value = values[key];
      return new AstroCookie(value);
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @returns
   */
  has(key, options = void 0) {
    if (__privateGet(this, _outgoing)?.has(key)) {
      let [, , isSetValue] = __privateGet(this, _outgoing).get(key);
      return isSetValue;
    }
    const values = __privateMethod(this, _ensureParsed, ensureParsed_fn).call(this, options);
    return !!values[key];
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    if (__privateGet(this, _consumed)) {
      const warning = new Error(
        "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page."
      );
      warning.name = "Warning";
      console.warn(warning);
    }
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    __privateMethod(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
      serializedValue,
      (0, import_cookie6.serialize)(key, serializedValue, serializeOptions),
      true
    ]);
    if (__privateGet(this, _request)[responseSentSymbol]) {
      throw new AstroError({
        ...errors_data_exports.ResponseSentError
      });
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (__privateGet(this, _outgoing) == null)
      return;
    for (const [, value] of __privateGet(this, _outgoing)) {
      yield value[1];
    }
  }
  /**
   * Behaves the same as AstroCookies.prototype.headers(),
   * but allows a warning when cookies are set after the instance is consumed.
   */
  static consume(cookies) {
    __privateSet(cookies, _consumed, true);
    return cookies.headers();
  }
};
_request = new WeakMap();
_requestValues = new WeakMap();
_outgoing = new WeakMap();
_consumed = new WeakMap();
_ensureParsed = new WeakSet();
ensureParsed_fn = function(options = void 0) {
  if (!__privateGet(this, _requestValues)) {
    __privateMethod(this, _parse, parse_fn).call(this, options);
  }
  if (!__privateGet(this, _requestValues)) {
    __privateSet(this, _requestValues, {});
  }
  return __privateGet(this, _requestValues);
};
_ensureOutgoingMap = new WeakSet();
ensureOutgoingMap_fn = function() {
  if (!__privateGet(this, _outgoing)) {
    __privateSet(this, _outgoing, /* @__PURE__ */ new Map());
  }
  return __privateGet(this, _outgoing);
};
_parse = new WeakSet();
parse_fn = function(options = void 0) {
  const raw2 = __privateGet(this, _request).headers.get("cookie");
  if (!raw2) {
    return;
  }
  __privateSet(this, _requestValues, (0, import_cookie6.parse)(raw2, options));
};

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = Symbol.for("astro.cookies");

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/constants.js
var ASTRO_VERSION = "4.4.2";
var clientAddressSymbol = Symbol.for("astro.clientAddress");
var clientLocalsSymbol = Symbol.for("astro.locals");
var responseSentSymbol2 = Symbol.for("astro.responseSent");

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/i18n/index.js
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function toCodes(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.codes[0];
    }
  });
}

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
  if (header === "*") {
    return [{ locale: header, qualityValue: void 0 }];
  }
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split = localeValue.split(";").map((str) => str.trim());
    const localeName = split[0];
    const qualityValue = split[1];
    if (!split) {
      continue;
    }
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice("q=".length));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) {
        result.push({
          locale: localeName,
          qualityValue: void 0
        });
      } else {
        result.push({
          locale: localeName,
          qualityValue: qualityValueAsFloat
        });
      }
    } else {
      result.push({
        locale: localeName,
        qualityValue: void 0
      });
    }
  }
  return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = toCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") {
      return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    }
    return true;
  }).sort((a3, b3) => {
    if (a3.qualityValue && b3.qualityValue) {
      if (a3.qualityValue > b3.qualityValue) {
        return -1;
      } else if (a3.qualityValue < b3.qualityValue) {
        return 1;
      }
    }
    return 0;
  });
}
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    const firstResult = browserLocaleList.at(0);
    if (firstResult && firstResult.locale !== "*") {
      for (const currentLocale of locales) {
        if (typeof currentLocale === "string") {
          if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
            result = currentLocale;
          }
        } else {
          for (const currentCode of currentLocale.codes) {
            if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
              result = currentLocale.path;
            }
          }
        }
      }
    }
  }
  return result;
}
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") {
      return locales.map((locale) => {
        if (typeof locale === "string") {
          return locale;
        } else {
          return locale.codes.at(0);
        }
      });
    } else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) {
        for (const loopLocale of locales) {
          if (typeof loopLocale === "string") {
            if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) {
              result.push(loopLocale);
            }
          } else {
            for (const code of loopLocale.codes) {
              if (code === browserLocale.locale) {
                result.push(loopLocale.path);
              }
            }
          }
        }
      }
    }
  }
  return result;
}
function computeCurrentLocale(pathname, locales, routingStrategy, defaultLocale) {
  for (const segment of pathname.split("/")) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (!segment.includes(locale))
          continue;
        if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
          return locale;
        }
      } else {
        if (locale.path === segment) {
          return locale.codes.at(0);
        } else {
          for (const code of locale.codes) {
            if (normalizeTheLocale(code) === normalizeTheLocale(segment)) {
              return code;
            }
          }
        }
      }
    }
  }
  if (routingStrategy === "pathname-prefix-other-locales" || routingStrategy === "domains-prefix-other-locales") {
    return defaultLocale;
  }
  return void 0;
}

// node_modules/.pnpm/astro@4.4.2_@types+node@20.11.19_typescript@5.3.3/node_modules/astro/dist/core/middleware/index.js
var clientAddressSymbol2 = Symbol.for("astro.clientAddress");
var clientLocalsSymbol2 = Symbol.for("astro.locals");
function createContext({
  request,
  params = {},
  userDefinedLocales = []
}) {
  let preferredLocale = void 0;
  let preferredLocaleList = void 0;
  let currentLocale = void 0;
  const url = new URL(request.url);
  const route = url.pathname;
  return {
    cookies: new AstroCookies(request),
    request,
    params,
    site: void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    props: {},
    redirect(path, status) {
      return new Response(null, {
        status: status || 302,
        headers: {
          Location: path
        }
      });
    },
    get preferredLocale() {
      return preferredLocale ?? (preferredLocale = computePreferredLocale(request, userDefinedLocales));
    },
    get preferredLocaleList() {
      return preferredLocaleList ?? (preferredLocaleList = computePreferredLocaleList(request, userDefinedLocales));
    },
    get currentLocale() {
      return currentLocale ?? (currentLocale = computeCurrentLocale(
        route,
        userDefinedLocales,
        void 0,
        void 0
      ));
    },
    url,
    get clientAddress() {
      if (clientAddressSymbol2 in request) {
        return Reflect.get(request, clientAddressSymbol2);
      }
      throw new AstroError(errors_data_exports.StaticClientAddressNotAvailable);
    },
    get locals() {
      let locals = Reflect.get(request, clientLocalsSymbol2);
      if (locals === void 0) {
        locals = {};
        Reflect.set(request, clientLocalsSymbol2, locals);
      }
      if (typeof locals !== "object") {
        throw new AstroError(errors_data_exports.LocalsNotAnObject);
      }
      return locals;
    },
    // We define a custom property, so we can check the value passed to locals
    set locals(val) {
      if (typeof val !== "object") {
        throw new AstroError(errors_data_exports.LocalsNotAnObject);
      } else {
        Reflect.set(request, clientLocalsSymbol2, val);
      }
    }
  };
}
function isLocalsSerializable(value) {
  let type = typeof value;
  let plainObject = true;
  if (type === "object" && isPlainObject3(value)) {
    for (const [, nestedValue] of Object.entries(value)) {
      if (!isLocalsSerializable(nestedValue)) {
        plainObject = false;
        break;
      }
    }
  } else {
    plainObject = false;
  }
  let result = value === null || type === "string" || type === "number" || type === "boolean" || Array.isArray(value) || plainObject;
  return result;
}
function isPlainObject3(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
function trySerializeLocals(value) {
  if (isLocalsSerializable(value)) {
    return JSON.stringify(value);
  } else {
    throw new Error("The passed value can't be serialized.");
  }
}

// <stdin>
async function middleware(request, context) {
  const ctx = createContext({
    request,
    params: {}
  });
  ctx.locals = {};
  const { origin } = new URL(request.url);
  const next = () => fetch(new URL("_render", request.url), {
    headers: {
      ...Object.fromEntries(request.headers.entries()),
      "x-astro-middleware-secret": "0abbab83-4ba5-45eb-bc0e-cad549602e7c",
      "x-astro-path": request.url.replace(origin, ""),
      "x-astro-locals": trySerializeLocals(ctx.locals)
    }
  });
  return onRequest(ctx, next);
}
export {
  middleware as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
