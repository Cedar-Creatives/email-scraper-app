module.exports = function generateCSV(emails) {
    const header = 'Email Addresses\n';
    const rows = emails.map(email => `${email}`).join('\n');
    return header + rows;
};