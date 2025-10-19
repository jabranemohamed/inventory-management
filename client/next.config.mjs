/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-inventorymanagement-mhj.s3.eu-west-3.amazonaws.com",
                port: "",
                pathname: "/**"

            }
        ]
    }
};

export default nextConfig;
