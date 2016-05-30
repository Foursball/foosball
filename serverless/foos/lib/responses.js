var topFooserResponses = [
  'Most definitely',
  'You betcha',
  'For sure',
  'Of course',
  'Obviously',
  'yas queen',
  'YEEEEEEAAAAAAAAH',
  'Yeyah',
  'Fo sho',
  'Yas. Werk.',
  'Da.'
];

var notTopFooserResponses = [
  'Not even close',
  'Nope',
  'Really?',
  'Definitely not',
  'Not this time',
  'Sucks to suck, playa.',
  'Nah, brah.',
  'No. Awkwaaaaard...',
  'Oh honey.'
];

var helpText = [
  'Foos - The Foursball Slack integration',
  '       help - This help text',
  '       top [number] - List the top ranked foosers (default: 5)',
  '       am I in the top [number] foosers?',
  '       is [fooser] in the top [number]?'
].join('\n');

module.exports = {
  help: help,
  topFooserResponse: topFooserResponse,
  notTopFooserResponse: notTopFooserResponse
};

function help() {
  return helpText;
}

function topFooserResponse() {
  return topFooserResponses[Math.floor(Math.random() * topFooserResponses.length)];
}

function notTopFooserResponse() {
  return notTopFooserResponses[Math.floor(Math.random() * notTopFooserResponses.length)];
}
