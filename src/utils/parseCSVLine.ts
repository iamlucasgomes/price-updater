export default function parseCSVLine(line: string) {
  const [productCode, newPrice] = line.split(",");
  return {
    productCode: productCode ? productCode.trim() : null,
    newPrice: newPrice ? parseFloat(newPrice.trim()) : null,
  };
}
