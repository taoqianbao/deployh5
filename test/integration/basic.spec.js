const helper = require('../helper');
const deployh5 = require('../../lib/');
const path = require('path');

const fixtures = path.join(__dirname, 'fixtures');
const fixtureName = 'basic';

beforeEach(() => {
  deployh5.clean();
});

describe('basic usage', () => {
  it('pushes the contents of a directory to a deployh5 branch', done => {
    const local = path.join(fixtures, fixtureName, 'local');
    const expected = path.join(fixtures, fixtureName, 'expected');
    const branch = 'deployh5';

    helper.setupRemote(fixtureName, {branch}).then(url => {
      const options = {
        repo: url,
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

  it('can push to a different branch', done => {
    const local = path.join(fixtures, fixtureName, 'local');
    const branch = 'master';

    helper.setupRemote(fixtureName, {branch}).then(url => {
      const options = {
        repo: url,
        branch: branch,
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
          .assertContentsMatch(local, url, branch)
          .then(() => done())
          .catch(done);
      });
    });
  });
});
