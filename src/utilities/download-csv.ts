import { download, generateCsv, mkConfig } from "export-to-csv";

export const downloadCSV = (data, filename: string) => {
  // csv config
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    useBom: true,
    filename,
  });

  // generate csv
  const csv = generateCsv(csvConfig)(data);

  // download csv
  download(csvConfig)(csv);
};
