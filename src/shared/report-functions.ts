import { InternalServerErrorException } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { CodeErrors } from './code-errors.enum';

export async function generateHtmlFromTemplate(
  reportData: object,
  templateName: string,
): Promise<string> {
  try {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'src',
      'report-templates',
      templateName,
    );
    return new Promise((resolve, reject) => {
      renderFile(filePath, reportData, (err, html) => {
        if (err) reject(err);
        resolve(html);
      });
    });
  } catch (err) {
    this.logger.error(
      `Failed generate HTML from contract list template. Cause: ${err}`,
    );
    throw new InternalServerErrorException({
      code: CodeErrors.FAIL_TO_GENERATE_HTML_FROM_EJS,
      message: err.message,
    });
  }
}
