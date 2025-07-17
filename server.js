// server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// خدمة الملفات الثابتة (واجهة المستخدم)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/scan', (req, res) => {
  const { ipRange } = req.body;
  if (!ipRange) return res.status(400).json({ error: 'يرجى إدخال نطاق IP' });

  const nmapCmd = `nmap -sn ${ipRange}`;
  exec(nmapCmd, (error, stdout) => {
    if (error) return res.status(500).json({ error: 'خطأ في تنفيذ nmap: ' + error.message });

    const regex = /Nmap scan report for ([0-9.]+)/g;
    const devices = [];
    let match;
    while ((match = regex.exec(stdout)) !== null) devices.push({ ip: match[1] });
    res.json({ devices });
  });
});

app.post('/scanPorts', (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: 'يرجى إدخال IP' });

  const nmapCmd = `nmap -p 1-1000 ${ip}`;
  exec(nmapCmd, (error, stdout) => {
    if (error) return res.status(500).json({ error: 'خطأ في تنفيذ nmap: ' + error.message });

    const ports = [];
    const lines = st
