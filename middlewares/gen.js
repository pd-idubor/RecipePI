const PDFDocument = require('pdfkit');
const fs = require('fs');



// Helper to move to next line
function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}
const generateCert = (userName) => {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  });
  doc.pipe(fs.createWriteStream(`Cert.pdf`));
 
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

  doc.fontSize(10);
 
  // Margin
  const distanceMargin = 18;
 
  doc
    .fillAndStroke('#0e8cc3')
    .lineWidth(20)
    .lineJoin('round')
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2,
    )
    .stroke();
  
  // Header
  const maxWidth = 140;
  const maxHeight = 70;
 
  doc.image('middlewares/images/vector.jpg', doc.page.width / 2 - maxWidth / 2, 60, {
    fit: [maxWidth, maxHeight],
    align: 'center',
  });
 
  jumpLine(doc, 5)
 
  doc
    .font('Times-Italic')
    .fontSize(10)
    .fill('#021c27')
    .text('The RecipePI Community', {
      align: 'center',
    });
  
  jumpLine(doc, 2)
  
  // Content
  doc
    .font('Times-Bold')
    .fontSize(16)
    .fill('#021c27')
    .text('CERTIFICATE OF ACHIEVEMENT	', {
      align: 'center',
    });
 
  jumpLine(doc, 1)
 
  doc
    .font('Times-Roman')
    .fontSize(10)
    .fill('#021c27')
    .text('Proudly presented to', {
      align: 'center',
    });
 
  jumpLine(doc, 2)
 
  doc
    .font('Times-Bold')
    .fontSize(24)
    .fill('#021c27')
    .text(`${userName}`, {
      align: 'center',
    });
 
  jumpLine(doc, 1)

  doc
    .font('Times-Roman')
    .fontSize(10)
    .fill('#021c27')
    .text('You are deeply appreciated for your continued contribution to the RecipePI community.', {
      align: 'center',
    });
 
  jumpLine(doc, 7)

  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;
  
  doc.fillAndStroke('#021c27');
  doc.strokeOpacity(0.2);
  
  const startLine2 = 334;
  const endLine2 = startLine2 + lineSize;
  doc
    .moveTo(startLine2, signatureHeight)
    .lineTo(endLine2, signatureHeight)
    .stroke();
  
  doc
    .font('Times-Bold')
    .fontSize(10)
    .fill('#021c27')
    .text('Precious Id', startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });

  doc
    .font('Times-Roman')
    .fontSize(10)
    .fill('#021c27')
    .text('Foundef', startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });
  
  const bottomHeight = doc.page.height - 100;
  
  doc.image('middlewares/images/badge.jpg', doc.page.width / 2 - 30, bottomHeight, {
    fit: [60, 60],
  });
  
  doc.end();
}

module.exports = generateCert;
