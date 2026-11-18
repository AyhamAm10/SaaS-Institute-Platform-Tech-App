/**
 * Web builds are served from a folder (EXPO_PUBLIC_WEB_BASE_URL, e.g. /parents);
 * native builds and development use the root.
 */
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    ...(process.env.EXPO_PUBLIC_WEB_BASE_URL ? { baseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL } : {}),
  },
});
