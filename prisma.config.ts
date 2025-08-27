import dotenv from "dotenv";
import { defineConfig } from "@prisma/config";
dotenv.config();
module.exports = defineConfig({
  schema: "src/prisma/schema.prisma",
});
