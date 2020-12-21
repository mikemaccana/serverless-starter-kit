let ENV = "production";
if (window.location.hostname === "localhost") {
  ENV = "development";
}

const PREFIXES = {
  development: "/_static",
  production: "SET_PRODUCTION_BUCKET_HERE",
};

export const arcStatic = function (staticFile: string): string {
  return `${PREFIXES[ENV]}${staticFile}`;
};

export const arcURL = function (url: string): string {
  return `${url}`;
};
