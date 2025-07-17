const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { NmapScan } = require('node-nmap');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// فحص الشبكة: يستقبل نطاق IP ويفحصه
app.post('/scan', (req, res) => {
  const { ipRange } = req.body;
  if (!ipRange) return res.status(400).json({ error: 'يرجى تحديد نطاق IP' });

  const scan = new NmapScan(ipRange, '-sP'); // Ping Scan

  scan.on('complete', (data) => {
    res.json({ devices: data });
  });

  scan.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });

  scan.startScan();
});

// فحص البورتات لجهاز معين
app.post('/scanPorts', (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: 'يرجى تحديد IP الجهاز' });

  const scan = new NmapScan(ip, '-p 1-1000'); // فحص بورتات 1 إلى 1000

  scan.on('complete', (data) => {
    res.json({ ports: data });
  });

  scan.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });

  scan.startScan();
});

// قطع الاتصال عن جهاز (ملاحظ: يحتاج تنفيذ أوامر نظام)
// تقدر تستخدم arpspoof أو iptables أو أي أداة مناسبة
app.post('/block', (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: 'يرجى تحديد IP الجهاز' });

  // هنا مثال تجريبي (ما ينفذ شيء حقيقي)
  // تقدر تضيف تنفيذ أمر مثل:
  // exec(`arpspoof -i eth0 -t ${ip} -r <gateway_ip>`, callback)

  res.json({ message: `تم محاولة قطع الاتصال عن الجهاز ${ip} (تجريبي)` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
