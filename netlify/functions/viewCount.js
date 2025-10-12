// Netlify Function — her gireni hasaplaýar, öň göreniň üstüni goşmaýar
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const ip = event.headers['x-forwarded-for'] || 'anon';
  const filePath = path.join(__dirname, 'viewData.json');

  let data = { count: 0, ips: [] };

  // Faýl bar bolsa oka
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // Eger şol IP öň ýok bolsa, +1 goş
  if (!data.ips.includes(ip)) {
    data.count++;
    data.ips.push(ip);

    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ count: data.count })
  };
};
