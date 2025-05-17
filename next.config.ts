const remoteEntry = "http://localhost:3001/static/js/mf_poc.js";

module.exports = {
  webpack(config: any, options: any) {
    const { isServer } = options;

    config.plugins.push(
      new (require("@module-federation/nextjs-mf").NextFederationPlugin)({
        name: "next_host",
        filename: "static/js/mf_poc.js", // <<< adiciona isso aqui
        remotes: {
          mf_poc: isServer
            ? `mf_poc@${remoteEntry}`
            : async () => {
                const res = await fetch(
                  "http://localhost:3001/mf-manifest.json"
                );
                const manifest = await res.json();
                return `mf_poc@http://localhost:3001/${manifest.remoteEntry.name}`;
              },
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );

    return config;
  },
};
