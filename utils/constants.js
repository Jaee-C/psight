module.exports = {
  // User account roles, ie. permission levels
  ROLE_ADMIN: "admin",
  ROLE_USER:"user",

  // Standard http codes
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_FOUND_REDIRECT: 302,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_NOT_FOUND: 404,
  HTTP_INTERNAL_SERVER_ERROR: 500,

  // Custom error codes
  ERROR_USER_NOT_FOUND: 4001,
  ERROR_INVALID_PASSWORD: 4002,
  RUNTIME_ERROR: 5000,
}
