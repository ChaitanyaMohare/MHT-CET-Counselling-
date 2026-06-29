const driveDocuments = {
  'pune-below-50': {
    fileId: '1DPdamcZnttemVN1GZTB7d4ZzG03tLaSM',
    name: 'PUNE Cut_off list Below 50%tile'
  }
};

/**
 * Generate a shareable link for a Google Drive file
 * @param {string} percentileRange - The percentile range (e.g., 'pune-below-50')
 * @returns {object} Object containing the file link and name
 */
function getDocumentLink(percentileRange) {
  const doc = driveDocuments[percentileRange];
  
  if (!doc || !doc.fileId) {
    return null;
  }
  
  // Generate direct view link
  const directLink = `https://drive.google.com/file/d/${doc.fileId}/view`;
  
  return {
    link: directLink,
    name: doc.name,
    percentileRange: percentileRange
  };
}

module.exports = {
  driveDocuments,
  getDocumentLink
};
