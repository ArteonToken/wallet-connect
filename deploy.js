const {execSync} = require('child_process');
const status = process.argv[2]

if (process.version.split('.')[0] ===  'v14' && process.platform === 'linux') {
  execSync('wget https://raw.githubusercontent.com/DiscordHooks/travis-ci-discord-webhook/master/send.sh')
  execSync('chmod +x send.sh')
  execSync(`./send.sh ${status} ` + process.argv[3])
}
