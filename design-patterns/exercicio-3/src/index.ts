import { ProductProviderFactory } from "./factory/ProductProviderFactory";

async function main() {
  const args = process.argv.slice(2);
  const inputArg = args.find((a) => a.startsWith("--input="));
  const formatArg = args.find((a) => a.startsWith("--format="));

  if (!inputArg || !formatArg) {
    console.error("Uso: node dist/index.js --input=arquivo --format=csv|json|xml");
    process.exit(1);
  }

  const filePath = inputArg.split("=")[1];
  const format = formatArg.split("=")[1];

  const provider = ProductProviderFactory.create(format);
  const products = await provider.load(filePath);

  console.log(JSON.stringify(products, null, 2));
}

main();
