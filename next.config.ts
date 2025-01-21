import { NextConfig } from "next";
import withTM from "next-transpile-modules";

// You can specify the modules you want to transpile here (e.g., 'antd')
const withTranspileModules = withTM(["antd"]);

const config: NextConfig = {
  webpack(config, { isServer }: { isServer: boolean }) {
    if (isServer) {
      config.externals = ["react", "react-dom", ...config.externals];
    }

    return config;
  },
};

// Wrap the existing config with withTM and export it
export default withTranspileModules(config);
