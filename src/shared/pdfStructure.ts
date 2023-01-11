import { join } from 'path';
import { PDFOptions } from 'puppeteer';
import { imgToBase64 } from './converters';

const base64img = imgToBase64(
  join(__dirname, '..', 'report-templates', 'logo.png'),
);

const headerTemplate = () => `
  <div style="width: 100%; margin: 1cm;">
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding-bottom: 16px;">
      <span style="display: flex; align-items: center; gap: 24px;">
        <img src="data:image/png;base64,${base64img}" width="auto" height="30">
        <span>
          <p style="font-size: 16px; font-weight: 500; margin: 0;">Martinez & Carvalho Software</p>
          <p style="font-size: 12px; font-weight: 400; margin: 0;">Rua Carmem Rodrigues Basi, 1500</p>
          <p style="font-size: 12px; font-weight: 400; margin: 0;">Parque Cidade Jardim, Votuporanga - SP</p>
          <p style="font-size: 12px; font-weight: 400; margin: 0;">(17) 3411-1444</p>
        </span>
      </span>
      <span>
      <span style="font-size: 9px;">
        Pág. <span class="pageNumber"></span> de <span class="totalPages"></span>
        </span>
      </span>
    </div>
    <hr style="width: 100%; margin: 0 0 24px 0;"/>
  </div>
`;

const getTodayForExtense = () =>
  new Date().toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    dayPeriod: 'short',
  });

const footerTemplate = () => `
<span style="width: 100%; margin: 0 1cm 1cm 1cm;">
  <hr style="width: 100%;"/>
  <span style="display: flex; 
    align-items: center; 
    color: black;
    width: 100%;
    font-size: 10px;">
    Impresso em: ${getTodayForExtense()}
  </span>
  </span>`;

export const pdfOptions = (): PDFOptions => ({
  printBackground: true,
  displayHeaderFooter: true,
  format: 'A4',
  headerTemplate: headerTemplate(),
  footerTemplate: footerTemplate(),
  margin: {
    bottom: '1cm',
    left: '1cm',
    right: '1cm',
  },
});
