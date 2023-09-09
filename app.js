const express = require('express')
const app = express()

app.get('/api', (req, res) => {
  const slack_name = req.query.slack_name
  const track = req.query.track

  const now = new Date()
  // Format UTC time as per requirements (e.g., "2023-09-09 12:42:04")
  const utc_time = now.toISOString().replace(/T/, ' ').replace(/\.\d+Z$/, '');

  const github_file_url = 'https://github.com/adewalefk/HNG-Task_1/blob/main/app.js'
  const github_repo_url = 'https://github.com/adewalefk/HNG-Task_1'

  // if (!['backend', 'frontend', 'full-stack'].includes(track)) {
  //   return res.status(400).json({ error: 'Invalid track parameter' });
  // }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const current_day = daysOfWeek[now.getDay()];

  const response = {
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code: 200
  }

  res.json(response)
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
