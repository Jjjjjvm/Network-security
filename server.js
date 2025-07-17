
// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/scan', (req, res) => {
  const { ipRange } = req.body;
  const fakeResult = `
تم العثور على الأجهزة في ${ipRange}:
- 192.168.1.2 ✅
- 192.168.1.5 ✅
- 192.168.1.10 ✅
(نتائج وهمية - استخدم nmap للفحص الحقيقي)
`.trim();

  res.json({ result: fakeResult });
});

app.listen(port, () => {
  console.log('🚀 السيرفر شغال على http://localhost:' + port);
});
  </script>

</body>
</html>
