const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  // Get query parameters
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Get current day of the week
  const currentDay = moment().tz('UTC').format('dddd');

  // Get current UTC time with validation of +/-2 minutes
  const currentUtcTime = moment().tz('UTC');
  const allowedDeviationMinutes = 2;
  const now = moment().tz('UTC');
  const isValidTime = now.isBetween(
    currentUtcTime.clone().subtract(allowedDeviationMinutes, 'minutes'),
    currentUtcTime.clone().add(allowedDeviationMinutes, 'minutes')
  );

  if (!slackName || !track || !isValidTime) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // GitHub URLs
  const githubFileUrl = 'https://github.com/username/repo/blob/main/app.js';
  const githubRepoUrl = 'https://github.com/adewaleftk/HNG-Task_1';

  // Response JSON
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: currentUtcTime.format('YYYY-MM-DDTHH:mm:ssZ'),
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
