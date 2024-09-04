import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split MUI components into separate chunks
            if (id.includes("@mui/material")) {
              return "mui-material-vendor";
            }
            if (id.includes("@mui/icons-material")) {
              return "mui-icons-vendor";
            }
            if (id.includes("@mui/x-date-pickers")) {
              return "mui-date-pickers-vendor";
            }
            // Grouping React-related libraries together
            if (id.includes("react")) {
              return "react-vendor";
            }
            // Grouping utility libraries together
            if (
              id.includes("axios") ||
              id.includes("moment-timezone") ||
              id.includes("shortid") ||
              id.includes("uuid")
            ) {
              return "utility-vendor";
            }
            // Grouping Tailwind-related libraries together
            if (id.includes("tailwindcss") || id.includes("@headlessui")) {
              return "tailwind-vendor";
            }
            // Grouping icon libraries together
            if (id.includes("react-icons") || id.includes("@heroicons")) {
              return "icon-vendor";
            }
            // Default behavior: create a separate chunk for other node_modules
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
