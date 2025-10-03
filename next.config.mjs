// /** @type {import('next').NextConfig} */
// const nextConfig = {
//    images: {
//     remotePatterns: [
//       {
//         hostname: "images.pexels.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
         pathname: "/**", // sabhi paths allow
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
         pathname: "/**", // sabhi paths allow
      },
    ],
  },
};

export default nextConfig;
