import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { writeFileSync } from "fs";
import { join } from "path";

export type BuildCsvProps = {
  headers: string[];
  rows: string[][];
};

@Injectable()
export class FilesService {
  private defaultCsvSeparator = "," as const;

  buildCsv({ headers, rows }: BuildCsvProps) {
    console.time("file");
    const csvHeaders = headers.join(this.defaultCsvSeparator);
    const csvRows = rows.map((row) => row.join(this.defaultCsvSeparator));

    csvRows.unshift(csvHeaders);
    const csv = csvRows.join("\n");

    try {
      writeFileSync("./testCsv.csv", csv);
      console.timeEnd("file");
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        "Failed to process file data"
      );
    }
  }
}
