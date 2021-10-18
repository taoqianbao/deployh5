const helper = require('../helper');
const deployh5 = require('../../lib/');
const path = require('path');

const fixtures = path.join(__dirname, 'fixtures');
const fixtureName = 'dest';

beforeEach(() => {
  deployh5.clean();
});

describe('the dest option', () => {
  it('allows publishing to a subdirectory within a branch', done => {
    const local = path.join(fixtures, fixtureName, 'local');
    const expected = path.join(fixtures, fixtureName, 'expected');
    const branch = 'deployh5';
    const dest = 'target';

    helper.setupRemote(fixtureName, {branch}).then(url => {
      const options = {
        repo: url,
        dest: dest,
        user: {
          name: 'User Name',
          email: 'user@email.com'
        }
      };

      deployh5.publish(local, options, err => {
        if (err) {
          return done(err);
        }
        helper
          .assertContentsMatch(expected, url, branch)
          .then(() => done())
          .catch(done);
      });
    });
  });
});
